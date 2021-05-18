import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { ISubListModel } from "../interfaces/ISubListModel";

let mongooseConnection = DataAccess.mongooseConnection;

class SubListModel {
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
        userId: Number,
      },
      { collection: "subscriptionList" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<ISubListModel>(
      "SubscriptionList",
      this.schema
    );
  }

  // retrieve all lists
  public retrieveAllLists(response: any) {
    var query = this.model.find({});
    query.exec((err, lists) => {
      response.json(lists);
    });
  }

  // retrieve a single list
  public retrieveASingleList(response: any, filter: Object): any {
    var query = this.model.findOne(filter);
    query.exec((err, list) => {
      response.json(list);
    });
  }

  // retrieve a single list
  public async retrieveASingleListId(filter: Object): Promise<any> {
    var query = this.model.findOne(filter);
    return new Promise<any>((resolve, reject) => {
      query.exec((err, list) => {
        resolve(list.listId);
      });
    });
  }
}
export { SubListModel };
