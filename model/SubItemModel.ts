import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { ISubItemModel } from "../interfaces/ISubItemModel";

let mongooseConnection = DataAccess.mongooseConnection;

class SubItemModel {
  public schema: any;
  public innerSchema: any;
  public model: any;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        listId: Number,
        itemId: Number,
        serviceName: String,
        addDate: Date,
        dueDate: Date,
        price: Number,
        isArchived: Boolean,
      },
      { collection: "subscriptionItems" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<ISubItemModel>(
      "SubscriptionItems",
      this.schema
    );
  }

  // Get all items 
  public retrieveAllItems(response: any, filter: Object): any {
    var query = this.model.find(filter); 
    query.exec((err, items) => {
      response.json(items);
    });
  }

  // Retrieve a single item detail
  public retrieveItemDetails(response: any, filter: Object): any {
    var query = this.model.findOne(filter);
    query.exec((err, item) => {
      response.json(item);
    });
  }

  // Update a single item detail
  public updateItemDetails(response: any, conditionDetail: Object, updateDetail: Object): any{
    const condition = conditionDetail;
    const update = updateDetail;
    this.model.findOneAndUpdate(condition, update, (err, doc) => {
      if (err) {
        console.log("object update failed");
        return;
      }
      response.json(doc)
    })
  }
}
export { SubItemModel };
