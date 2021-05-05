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
        // get all items
        router.get("/app/list/:listId", function (req, res) {
            var listid = +req.params.listId;
            console.log("Query all items in the list in db");
            _this.SubscriptionItem.retrieveAllItems(res, { listId: listid });
        });
        // create new item
        // router.post("/app/list/", function (req, res) {
        //   console.log(req.body);
        //   var jsonObj = req.body;
        //   //jsonObj.listId = this.idGenerator;
        //   this.SubscriptionList.model.create([jsonObj], function (err) {
        //     if (err) {
        //       console.log("object creation failed");
        //     }
        //   });
        //   res.send(this.idGenerator.toString());
        //   this.idGenerator++;
        // });
        router.post('/app/list/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.listId = this.idGenerator;
            _this.SubscriptionItem.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        // get specific item based on itemId
        router.get("/app/list/:listId/item/:itemId/", function (req, res) {
            var listid = +req.params.listId;
            var itemid = +req.params.itemId;
            console.log("listId = ", listid, " itemid = ", itemid);
            _this.SubscriptionItem.retrieveItemDetails(res, { listId: listid, itemId: itemid });
        });
        // update existed item
        router.put("/app/items/:itemId", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //update existed record
            res.send("PUT: /app/items/:itemId");
        });
        this.expressApp.use("/", router);
        this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
        this.expressApp.use("/images", express.static(__dirname + "/img"));
        this.expressApp.use("/", express.static(__dirname + "/pages"));
    };
    return App;
}());
exports.App = App;
