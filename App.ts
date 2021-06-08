//import * as path from 'path';
import * as express from "express";
import * as logger from "morgan";
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from "body-parser";
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
import * as passport from 'passport';
import GooglePassport from './model/GooglePassportConfig/GooglePassport'

import { SubscriptionListModel } from "./model/SubscriptionListModel";
import { SubscriptionItemModel } from "./model/SubscriptionItemModel";
import { UserModel } from "./model/UserModel";
import { profile } from "node:console";
import * as EmailReminder from "./utils/recurCheckPayDay.js";
import * as cors from "cors";


// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  public SubscriptionList: SubscriptionListModel;
  public SubscriptionItem: SubscriptionItemModel;
  public User: UserModel;
  public idGenerator: number;
  public googlePassportConfig:GooglePassport;
  public EmailReminder: any;

  //Run configuration methods on the Express instance.
  constructor() {
    this.User = new UserModel();
    this.SubscriptionList = new SubscriptionListModel();
    this.SubscriptionItem = new SubscriptionItemModel();
    this.EmailReminder = new EmailReminder();
    this.googlePassportConfig = new GooglePassport(this.User, this.SubscriptionList);
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 102;

    this.EmailReminder.recurCheckPayDay(this.User, this.SubscriptionList, this.SubscriptionItem)
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
      }
      next();
    });
    this.expressApp.use(logger("dev"));
    this.expressApp.use(bodyParser.json());
   
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(session(
      {secret : 'secret text',
      resave: true,
      saveUnitialized: true
    }));
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
  }

  // Check if user is already authenticated
  private IsUserAuthenticated(req, res, next):void {
    if(req.isAuthenticated()) {
      console.log("User is already authenticated");
      return next();
    } 
    console.log("User is not yet authenticated");
    res.redirect("/"); 
    
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    /********************************* Google OAuth ***************************/
    
    // For login in with google
    router.get("/auth/google",
      passport.authenticate('google', { 
        scope: ['profile', 'email'] 
    }));

    // Callback function after logged in
    router.get("/auth/google/callback", 
    passport.authenticate('google', 
      { failureRedirect: '/' }
    ),
    (req, res) => {
        console.log("User successfuly authenticated using google.");
        // redirect to the right list
        var currUser = (<any>req).user;
        console.log(currUser.userId);
        res.redirect("/#/subscriptions/" + currUser.userId);
      } 
    );

    // For logging out from google
    router.get("/auth/logout", (req, res) => {
      var request = (<any>req);
      request.session = null; 
      request.logout();
      res.redirect('/');
    });

    /********************************* ITEM ***********************************/
    // get all items using listId
    router.get("/app/item/list/:listId", this.IsUserAuthenticated, (req, res) => {
      console.log();
      var listid: number = +req.params.listId;
      console.log("Retrieve all items in the list with listId: ", listid);
      this.SubscriptionItem.retrieveAllItems(res, { listId: listid });
    });

    // get all items using userId
    router.get("/app/item/user/:userId", (req, res) => {
      console.log();
      var userid = req.params.userId;
      console.log("Retrieve all items in the list with userId: ", userid);
      this.SubscriptionList.retrieveListId({ userId: userid }).then(
        (listId) => {
          if (listId)
            this.SubscriptionItem.retrieveAllItems(res, { listId: listId });
        }
      );
    });

    // get specific item based on itemId
    router.get("/app/item/:itemId", (req, res) => {
      var itemid: number = +req.params.itemId;
      console.log(" itemid = ", itemid);
      this.SubscriptionItem.retrieveItemDetails(res, { itemId: itemid });
    });

    // post an item
    router.post("/app/item/",(req, res) => {
      console.log();
      console.log("Create a new item");
      console.log("Req.body: ", req.body);
      var jsonObj = req.body;
      var itemID;
      this.SubscriptionItem.getLastItemId().then((resolve) => {
          itemID = resolve += 1;
          console.log(itemID);
          jsonObj.itemId = itemID;
          this.SubscriptionItem.model.create([jsonObj], (err) => {
          if (err) {
            console.log("item creation failed");
          }
      });
      res.send(this.idGenerator.toString());
      this.idGenerator++;
      });

      
    });

    // update existed item
    router.put("/app/item/:itemId", (req, res) => {
      var itemID: number = +req.params.itemId;
      var conditionDetail = { itemId: itemID };
      var updateDetail = req.body;
      //update existed record
      this.SubscriptionItem.updateItemDetails(
        res,
        conditionDetail,
        updateDetail
      );
    });

    // delete an item
    router.delete("/app/item/:itemId/", (req, res) => {
      var itemId: number = +req.params.itemId;
      this.SubscriptionItem.deleteItem(res, { itemId: itemId });
    });

    /*********************************** LIST ***********************************/
    // Retrieve a list's information (not including items) by userId
    router.get("/app/list/user/:userId", (req, res) => {
      console.log();
      var userId = req.params.userId;
      console.log("Retrieve a single list by userId: ", userId);
      this.SubscriptionList.retrieveListInfo(res, { userId: userId });
    });

    // Modify a list by userId
    router.put("/app/list/user/:userId", (req, res) => {
      console.log();
      var userid = req.params.userId;
      console.log("Update list's information with userId = ", userid);
      console.log("Req.body: ", req.body);
      this.SubscriptionList.updateListInfo(res, { userId: userid }, req.body);
    });

    /************************************ USER *********************************/
    // Retrieve a single user by userId
    router.get("/app/user/:userId", (req, res) => {
      console.log();
      var userId = req.params.userId;
      console.log("Retrieve info of a user with userId = ", userId);
      this.User.retrieveASingleUser(res, { userId: userId });
    });

    // Modify a single user information based on userId
    router.put("/app/user/:userId", (req, res) => {
      console.log();
      var userId = req.params.userId;
      console.log("Update information of a user with userId = ", userId);
      console.log("Req.body: ", req.body);
      this.User.updateUserInfo(res, { userId: userId }, req.body);
    });

    /************************************ REMINDER *********************************/
    router.post("/app/sendemail/", (req, res) => {
      var jsonObj = req.body;
      console.log(jsonObj);

      this.EmailReminder.sendEmail({ subscription: jsonObj.subscription, client: jsonObj.client });
      res.send("DOne");
    });

    this.expressApp.use("/", router);
    this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
    this.expressApp.use("/images", express.static(__dirname + "/img"));
    this.expressApp.use("/", express.static(__dirname + "/angular-dist/dist/app"));
  }
}

export { App };
