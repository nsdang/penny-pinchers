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
                owner: String,
            },
        );
    }

    public createModel():void{
        this.model = mongooseConnection.model<ISubListModel>("SubscriptionList", this.schema);
    }

    // return the list details (name, desc,...)
    public retrieveListDetails(response:any, filter:Object):any {
        var query = this.model.findOne(filter); // find the list according to owner/userId?
        query.exec((err, list) => {
            response.json(list);
        });
    }
}
export {SubListModel};