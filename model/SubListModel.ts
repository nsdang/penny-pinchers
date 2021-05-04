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
                itemList: [
                    { 
                        itemId: Number,
                        serviceName: String,
                        addDate: Date,
                        dueDate: Date,
                        price: Number,
                        isArchived: Boolean,
                        type: String,
                    }
                ]
            }, {collection: 'subscriptionList'}
        );
    }

    public createModel():void{
        this.model = mongooseConnection.model<ISubListModel>("SubscriptionList", this.schema);
    }

    // retrieve a single list filter by userId
    public retrieveAllItems(response:any, filter:Object):any {
        var query = this.model.findOne(filter); 
        query.exec((err, list) => {
            response.json(list);
        });
    }

    // retrieve all lists
    public retrieveAllLists(response:any)
    {
        var query = this.model.find({});
        query.exec((err, lists) => {
            response.json(lists);
        });
    }

    // retrieve a single item detail
    public retrieveItemDetails(response:any, filter:Object, itemid:Number):any {
        var query = this.model.findOne(filter);
        query.exec((err, list) => {
            var itemDetail = list.itemList.find(i => i.itemId === itemid);
            response.json(itemDetail);
        });
    }
}
export {SubListModel};