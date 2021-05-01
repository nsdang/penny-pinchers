import Mongoose = require("mongoose");
// import dataAccess
import {ISubItemModel} from './interfaces/ISubItemModel';

class ItemModel {

    public schema:any;
    public model:any;

    public constructor()
    {
       
    }

    public createSchema():void {
        this.schema = new Mongoose.Schema( 
            {
                owner:String, //owner or listId?
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
        )
    };

}