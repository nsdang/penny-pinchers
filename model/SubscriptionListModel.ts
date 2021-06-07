import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { ISubscriptionListModel } from "../interfaces/ISubscriptionListModel";

let mongooseConnection = DataAccess.mongooseConnection;

class SubscriptionListModel {
  public schema: any;
  public model: any;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        listId: Number,
        name: String,
        description: String,
        userId: String,
      },
      { collection: "SubscriptionList" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<ISubscriptionListModel>(
      "SubscriptionList",
      this.schema
    );
  }

   // retrieve last user's listId
   public getLastListId() : any {
    var query = this.model.findOne().sort({listId : 'descending'});
    return new Promise((resolve, reject) => {
        query.exec((err, list) => {      
           resolve(list.listId);
        });
     })
  }
  // retrieve all lists
  public retrieveAllLists(response: any) {
    var query = this.model.find({});
    query.exec((err, lists) => {
      response.json(lists);
    });
  }

  // retrieve a single list's info
  public retrieveListInfo(response: any, filter: Object): any {
    var query = this.model.findOne(filter);
    query.exec((err, list) => {
      response.json(list);
    });
  }

  // return a single list based on listId
  public returnOwnerId(filter: Object): any {
    var query = this.model.findOne(filter);
    query.exec((err, list) => {
      return new Promise<any>((resolve, reject) => {
        query.exec((err, list) => {
          resolve(list.userId);
        });
      }); 
    })
  }

  // retrieve a single list ID given an object
  public async retrieveListId(filter: Object): Promise<any> {
    var query = this.model.findOne(filter);
    return new Promise<any>((resolve, reject) => {
      query.exec((err, list) => {
        resolve(list.listId);
      });
    });
  }

  // update list's info
  public updateListInfo (response: any, filter: Object, reqBody: Object ) : any {
    var query = this.model.findOneAndUpdate(filter, reqBody);
    query.exec((err, result) => {
        if (err) {
            console.log("Error of update: ");
            console.log(err);
        }
        response.json(result);
    });
  }
}
export { SubscriptionListModel };
