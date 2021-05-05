import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import {ISubListModel} from '../interfaces/ISubListModel'

let mongooseConnection = DataAccess.mongooseConnection;

class SubListModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema():void {
        this.schema = new Mongoose.Schema(
            {
                listId: Number,
                name: String,
                description: String,
                userId: Number,
            }, {collection: 'subscriptionList'}
        );
    }

    public createModel():void{
        this.model = mongooseConnection.model<ISubListModel>("SubscriptionList", this.schema);
    }

    // retrieve all lists
    public retrieveAllLists(response:any)
    {
        var query = this.model.find({});
        query.exec((err, lists) => {
            response.json(lists);
        });
    }
}
export {SubListModel};