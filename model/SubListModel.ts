import Mongoose = require("mongoose");
import { DataAccess } from "../../Hilerio-repo/MongooseDB/DataAccess";
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
                name: String,
                description: String,
                owner: String,
            },
        );
    }

    public createModel():void{
        this.model = mongooseConnection.Model<ISubListModel>("SubscriptionList", this.schema);
    }

    public retrieveList(response:any):any {
        var query = this.model.find({});
        query.exec((err, list) => {
            response.json(list);
        });
    }
}
export {ISubListModel};