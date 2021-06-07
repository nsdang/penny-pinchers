"use strict";
exports.__esModule = true;
exports.App = void 0;
//import * as path from 'path';
var express = require("express");
var logger = require("morgan");
//import * as mongodb from 'mongodb';
//import * as url from 'url';
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
var passport = require("passport");
var GooglePassport_1 = require("./model/GooglePassportConfig/GooglePassport");
var SubscriptionListModel_1 = require("./model/SubscriptionListModel");
var SubscriptionItemModel_1 = require("./model/SubscriptionItemModel");
var UserModel_1 = require("./model/UserModel");
var EmailReminder = require("./utils/recurCheckPayDay.js");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.User = new UserModel_1.UserModel();
        this.SubscriptionList = new SubscriptionListModel_1.SubscriptionListModel();
        this.SubscriptionItem = new SubscriptionItemModel_1.SubscriptionItemModel();
        this.EmailReminder = new EmailReminder();
        this.googlePassportConfig = new GooglePassport_1["default"](this.User, this.SubscriptionList);
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 102;
        this.EmailReminder.recurCheckPayDay(this.User, this.SubscriptionList, this.SubscriptionItem);
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            if (req.method === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
                return res.status(200).json({});
            }
            next();
        });
        this.expressApp.use(logger("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(session({ secret: 'secret text',
            resave: true,
            saveUnitialized: true
        }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    };
    // Check if user is already authenticated
    App.prototype.IsUserAuthenticated = function (req, res, next) {
        req.session.cookie.httpOnly = false;
        if (req.isAuthenticated()) {
            console.log("User is already authenticated");
            return next();
        }
        else {
            console.log("User is not yet authenticated");
            res.redirect("/");
        }
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        /********************************* Google OAuth ***************************/
        // For login in with google
        router.get("/auth/google", passport.authenticate('google', {
            scope: ['profile', 'email']
        }));
        // Callback function after logged in
        router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
            console.log("User successfuly authenticated using google.");
            // redirect to the right list
            var currUser = req.user;
            console.log(currUser.userId);
            res.redirect("/#/subscriptions/" + currUser.userId);
        });
        // For logging out from google
        router.get("/auth/logout", function (req, res) {
            var request = req;
            request.session = null;
            request.logout();
            res.redirect('/');
        });
        /********************************* ITEM ***********************************/
        // get all items using listId
        router.get("/app/item/list/:listId", function (req, res) {
            console.log();
            var listid = +req.params.listId;
            console.log("Retrieve all items in the list with listId: ", listid);
            _this.SubscriptionItem.retrieveAllItems(res, { listId: listid });
        });
        // get all items using userId
        router.get("/app/item/user/:userId", this.IsUserAuthenticated, function (req, res) {
            console.log();
            var userid = req.params.userId;
            console.log("Retrieve all items in the list with userId: ", userid);
            _this.SubscriptionList.retrieveListId({ userId: userid }).then(function (listId) {
                if (listId)
                    _this.SubscriptionItem.retrieveAllItems(res, { listId: listId });
            });
        });
        // get specific item based on itemId
        router.get("/app/item/:itemId", function (req, res) {
            var itemid = +req.params.itemId;
            console.log(" itemid = ", itemid);
            _this.SubscriptionItem.retrieveItemDetails(res, { itemId: itemid });
        });
        // post an item
        router.post("/app/item/", function (req, res) {
            console.log();
            console.log("Create a new item");
            console.log("Req.body: ", req.body);
            var jsonObj = req.body;
            var itemID;
            _this.SubscriptionItem.getLastItemId().then(function (resolve) {
                itemID = resolve += 1;
                console.log(itemID);
                jsonObj.itemId = itemID;
                _this.SubscriptionItem.model.create([jsonObj], function (err) {
                    if (err) {
                        console.log("item creation failed");
                    }
                });
                res.send(_this.idGenerator.toString());
                _this.idGenerator++;
            });
        });
        // update existed item
        router.put("/app/item/:itemId", function (req, res) {
            var itemID = +req.params.itemId;
            var conditionDetail = { itemId: itemID };
            var updateDetail = req.body;
            //update existed record
            _this.SubscriptionItem.updateItemDetails(res, conditionDetail, updateDetail);
        });
        // delete an item
        router["delete"]("/app/item/:itemId/", function (req, res) {
            var itemId = +req.params.itemId;
            _this.SubscriptionItem.deleteItem(res, { itemId: itemId });
        });
        /*********************************** LIST ***********************************/
        // Retrieve a list's information (not including items) by userId
        router.get("/app/list/user/:userId", function (req, res) {
            console.log();
            var userId = +req.params.userId;
            console.log("Retrieve a single list by userId: ", userId);
            _this.SubscriptionList.retrieveListInfo(res, { userId: userId });
        });
        // Modify a list by userId
        router.put("/app/list/user/:userId", function (req, res) {
            console.log();
            var userid = +req.params.userId;
            console.log("Update list's information with userId = ", userid);
            console.log("Req.body: ", req.body);
            _this.SubscriptionList.updateListInfo(res, { userId: userid }, req.body);
        });
        /************************************ USER *********************************/
        // // Create a new user
        // router.post("/app/user/", (req, res) => {
        //   console.log();
        //   console.log("Create a new user");
        //   console.log("Req.body: ", req.body);
        //   var jsonObj = req.body;
        //   var userId = jsonObj.userId;
        //   var userName = jsonObj.fname;
        //   this.User.model.create([jsonObj], (err) => {
        //     if (err) {
        //       console.log("user creation failed");
        //     }
        //   });
        //   // create a new list assigned to user
        //   var listId = this.idGenerator;
        //   var userJsonObj = {
        //     listId: listId,
        //     name: userName + "'s List",
        //     description: "",
        //     userId: userId,
        //   };
        //   this.SubscriptionList.model.create([userJsonObj], (err) => {
        //     if (err) {
        //       console.log("user creation failed");
        //     }
        //   });
        //   res.send(this.idGenerator.toString());
        //   this.idGenerator++;
        // });
        // Retrieve a single user by userId
        router.get("/app/user/:userId", function (req, res) {
            console.log();
            var userId = +req.params.userId;
            console.log("Retrieve info of a user with userId = ", userId);
            _this.User.retrieveASingleUser(res, { userId: userId });
        });
        // Modify a single user information based on userId
        router.put("/app/user/:userId", function (req, res) {
            console.log();
            var userId = +req.params.userId;
            console.log("Update information of a user with userId = ", userId);
            console.log("Req.body: ", req.body);
            _this.User.updateUserInfo(res, { userId: userId }, req.body);
        });
        /************************************ REMINDER *********************************/
        router.post("/app/sendemail/", function (req, res) {
            var jsonObj = req.body;
            console.log(jsonObj);
            _this.EmailReminder.sendEmail({ subscription: jsonObj.subscription, client: jsonObj.client });
            res.send("DOne");
        });
        this.expressApp.use("/", router);
        this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
        this.expressApp.use("/images", express.static(__dirname + "/img"));
        this.expressApp.use("/", express.static(__dirname + "/angular-dist/dist/app"));
    };
    return App;
}());
exports.App = App;
