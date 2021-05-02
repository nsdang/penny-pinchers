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
//import {ListModel} from './model/ListModel';
//import {TaskModel} from './model/TaskModel';
//import {DataAccess} from './DataAccess';
var SubListModel_1 = require("./model/SubListModel");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 102;
        this.SubscriptionList = new SubListModel_1.SubListModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var router = express.Router();
        /******************************************************
         * ***************Penny-pinchers' Router*******************
         ******************************************************/
        router.put("/app/items/:itemId", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //update existed record
            res.send("PUT: /app/items/:itemId");
        });
        // get all items
        router.get("/app/list/:listId", function (req, res) {
            //?????????????
            console.log("Query all items in the list in db");
            this.SubscriptionList.retrieveAllItems(res);
        });
        // create new item
        router.post("/app/list/", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.listId = this.idGenerator;
            this.SubscriptionList.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
            res.send(this.idGenerator.toString());
            this.idGenerator++;
        });
        // router.get("/app/list/:listId/count", (req, res) => {
        //   var id = req.params.listId;
        //   console.log("Query single list with id: " + id);
        //   // this.Tasks.retrieveTasksCount(res, {listId: id});
        // });
        // router.post("/app/list/", (req, res) => {
        //   console.log(req.body);
        //   var jsonObj = req.body;
        //   //jsonObj.listId = this.idGenerator;
        //   /* this.Lists.model.create([jsonObj], (err) => {
        //         if (err) {
        //             console.log('object creation failed');
        //         }
        //     });
        //     */
        //   res.send(this.idGenerator.toString());
        //   this.idGenerator++;
        // });
        // router.get("/app/list/:listId", (req, res) => {
        //   var id = req.params.listId;
        //   console.log("Query single list with id: " + id);
        //   //this.Tasks.retrieveTasksDetails(res, {listId: id});
        // });
        // router.get("/app/list/", (req, res) => {
        //   console.log("Query All list");
        //   //this.Lists.retrieveAllLists(res);
        // });
        // router.get("/app/listcount", (req, res) => {
        //   console.log("Query the number of list elements in db");
        //   // this.Lists.retrieveListCount(res);
        // });
        this.expressApp.use("/", router);
        this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
        this.expressApp.use("/images", express.static(__dirname + "/img"));
        this.expressApp.use("/", express.static(__dirname + "/pages"));
    };
    return App;
}());
exports.App = App;
