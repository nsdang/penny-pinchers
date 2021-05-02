//import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from 'body-parser';
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

//import {ListModel} from './model/ListModel';
//import {TaskModel} from './model/TaskModel';
//import {DataAccess} from './DataAccess';
import {SubListModel} from './model/SubListModel'
import {SubItemModel} from './model/SubItemModel'

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
 // public Lists:ListModel;
 // public Tasks:TaskModel;
  public SubscriptionList:SubListModel;
  public SubscriptionItem:SubItemModel;
  public idGenerator:number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 102;
    //this.Lists = new ListModel();
    //this.Tasks = new TaskModel();
    this.SubscriptionItem = new SubItemModel();
    this.SubscriptionList = new SubListModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger('dev'));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    /******************************************************
     * ***************Penny-pinchers' Router*******************
     ******************************************************/
     router.put("/app/items/:itemId", (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      //update existed record
      res.send("PUT: /app/items/:itemId");
    });


    router.get('/app/list/:listId/count', (req, res) => {
        var id = req.params.listId;
        console.log('Query single list with id: ' + id);
       // this.Tasks.retrieveTasksCount(res, {listId: id});
    });

    router.post('/app/list/', (req, res) => {
        console.log(req.body);
        var jsonObj = req.body;
        //jsonObj.listId = this.idGenerator;
       /* this.Lists.model.create([jsonObj], (err) => {
            if (err) {
                console.log('object creation failed');
            }
        });
        */
        res.send(this.idGenerator.toString());
        this.idGenerator++;
    });

    router.get('/app/list/:listId', (req, res) => {
        var id = req.params.listId;
        console.log('Query single list with id: ' + id);
        //this.Tasks.retrieveTasksDetails(res, {listId: id});
    });

    router.get('/app/list/', (req, res) => {
        console.log('Query All list');
        //this.Lists.retrieveAllLists(res);
    });

    router.get('/app/listcount', (req, res) => {
      console.log('Query the number of list elements in db');
     // this.Lists.retrieveListCount(res);
    });

////// get all items
    router.get('/app/list/:listId', function (req, res) { //?????????????
      console.log('Query all items in the list in db');
      this.SubscriptionItem.retrieveAllItems(res);
    });

    // create new item
    router.post('/app/list/', function (req, res) {
      console.log(req.body);
      var jsonObj = req.body;
      //jsonObj.listId = this.idGenerator;
      this.SubsciptionItem.model.create([jsonObj], function (err) {
          if (err) {
              console.log('object creation failed');
          }
      });
      res.send(this.idGenerator.toString());
      this.idGenerator++;
    });

    
    


    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }

}

export {App};