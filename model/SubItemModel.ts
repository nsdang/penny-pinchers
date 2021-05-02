import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import {ISubItemModel} from '../interfaces/ISubItemModel'

let mongooseConnection = DataAccess.mongooseConnection;

class ItemModel {
    public schema:any;
    public innerSchema:any;
    public model:any;

    public constructor()
    {
       this.createSchema();
    }

    public createSchema():void {
        this.schema = new Mongoose.Schema( 
            {
                listId : Number, 
                itemList: [
                    { 
                        serviceName: String,
                        addDate: Date,
                        dueDate: Date,
                        price: Number,
                        isArchived: Boolean,
                    }
                ]
            }, {collection: 'itemList'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<ISubItemModel>("SubscriptionItems", this.schema);
    }

    // we call this and passing in the listId to get all the items
    public retrieveAllItems(response:any, filter:Object)
    {
        var query = this.model.findOne(filter); // return one list with listId
        query.exec((err, items) => {
            response.json(items);
        });
    }
}




