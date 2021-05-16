//import * as path from 'path';
import * as express from "express";
import * as logger from "morgan";
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from "body-parser";
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

import { SubListModel } from "./model/SubListModel";
import { SubItemModel } from "./model/SubItemModel";
import { UserModel } from "./model/UserModel";

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  public SubscriptionList: SubListModel;
  public SubscriptionItem: SubItemModel;
  public User: UserModel;
  public idGenerator: number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 102;
    this.SubscriptionList = new SubListModel();
    this.SubscriptionItem = new SubItemModel();
    this.User = new UserModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger("dev"));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    // get all items
    router.get("/app/list/:listId", (req, res) => {
      var listid : number = +req.params.listId;
      console.log("Query all items in the list in db");
      this.SubscriptionItem.retrieveAllItems(res, {listId:listid});
    });

    // get specific item based on itemId
    router.get("/app/list/:listId/item/:itemId/", (req, res) => {
      var listid : number = +req.params.listId;
      var itemid : number = +req.params.itemId;
      console.log("listId = ", listid, " itemid = ", itemid);
      this.SubscriptionItem.retrieveItemDetails(res, {listId: listid, itemId: itemid});
    });

    // post an item
    router.post('/app/item/', (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      //jsonObj.listId = this.idGenerator;
      this.SubscriptionItem.model.create([jsonObj], (err) => {
          if (err) {
              console.log('object creation failed');
          }
      });
      res.send(this.idGenerator.toString());
      this.idGenerator++;
  });

  // Create a new user
  router.post('/app/user/', (req, res) => {
    console.log(req.body);
    var jsonObj = req.body;
    jsonObj.userId = this.idGenerator;
    this.User.model.create([jsonObj], (err) => {
        if (err) {
            console.log('object creation failed');
        }
    });
    res.send(this.idGenerator.toString());
    this.idGenerator++;
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
    // Create a new user


    this.expressApp.use("/", router);

    this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
    this.expressApp.use("/images", express.static(__dirname + "/img"));
    this.expressApp.use("/", express.static(__dirname + "/pages"));
  }
}

export { App };
