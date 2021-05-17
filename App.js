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
        // get all items
        router.get("/app/list/:listId", function (req, res) {
            console.log();
            var listid = +req.params.listId;
            console.log("Retrieve all items in the list with listId: ", listid);
            _this.SubscriptionItem.retrieveAllItems(res, { listId: listid });
        });
        // get specific item based on itemId
        router.get("/app/list/:listId/item/:itemId/", function (req, res) {
            console.log();
            var listid = +req.params.listId;
            var itemid = +req.params.itemId;
            console.log("Retrieve item in list with listId = ", listid, " and itemid = ", itemid);
            _this.SubscriptionItem.retrieveItemDetails(res, { listId: listid, itemId: itemid });
        });
        // post an item
        router.post('/app/item/', function (req, res) {
            console.log();
            console.log("Create a new item");
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.listId = this.idGenerator;
            _this.SubscriptionItem.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('item creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        /*
          // update existed item
          router.put("/app/items/:itemId", (req, res) => {
            console.log(req.body);
            var jsonObj = req.body;
            //update existed record
            res.send("PUT: /app/items/:itemId");
          });
      */
        /*********************************** LIST ***********************************/
        // Retrieve a single list by userId
        router.get("/app/list/user/:userId", function (req, res) {
            console.log();
            var userId = +req.params.userId;
            console.log("Retrieve a single list by userId: ", userId);
            _this.SubscriptionList.retrieveASingleList(res, { userId: userId });
        });
        /************************************ USER *********************************/
        // Create a new user
        router.post('/app/user/', function (req, res) {
            console.log();
            console.log("Create a new user");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.userId = _this.idGenerator;
            _this.User.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('user creation failed');
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
            console.log(req.body);
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
