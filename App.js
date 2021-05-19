"use strict";
exports.__esModule = true;
exports.App = void 0;
//import * as path from 'path';
var express = require("express");
var logger = require("morgan");
//import * as mongodb from 'mongodb';
//import * as url from 'url';
var bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
var SubListModel_1 = require("./model/SubListModel");
var SubItemModel_1 = require("./model/SubItemModel");
var UserModel_1 = require("./model/UserModel");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 102;
        this.SubscriptionList = new SubListModel_1.SubListModel();
        this.SubscriptionItem = new SubItemModel_1.SubItemModel();
        this.User = new UserModel_1.UserModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        /********************************* ITEM ***********************************/
        // get all items using listId
        router.get("/app/item/list/:listId", function (req, res) {
            console.log();
            var listid = +req.params.listId;
            console.log("Retrieve all items in the list with listId: ", listid);
            _this.SubscriptionItem.retrieveAllItems(res, { listId: listid });
        });
        // get all items using userId
        router.get("/app/item/user/:userId", function (req, res) {
            console.log();
            var userid = +req.params.userId;
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
            //jsonObj.listId = this.idGenerator;
            _this.SubscriptionItem.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("item creation failed");
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
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
        // Create a new user
        router.post("/app/user/", function (req, res) {
            console.log();
            console.log("Create a new user");
            console.log("Req.body: ", req.body);
            var jsonObj = req.body;
            var userId = jsonObj.userId;
            var userName = jsonObj.fname;
            _this.User.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("user creation failed");
                }
            });
            // create a new list assigned to user
            var listId = _this.idGenerator;
            var userJsonObj = {
                "listId": listId,
                name: userName + "'s List",
                description: "",
                userId: userId
            };
            _this.SubscriptionList.model.create([userJsonObj], function (err) {
                if (err) {
                    console.log("user creation failed");
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
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
        this.expressApp.use("/", router);
        this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
        this.expressApp.use("/images", express.static(__dirname + "/img"));
        this.expressApp.use("/", express.static(__dirname + "/pages"));
    };
    return App;
}());
exports.App = App;
