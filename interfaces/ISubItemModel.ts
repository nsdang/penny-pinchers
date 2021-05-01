import Mongoose = require("mongoose");

interface ISubItemModel extends Mongoose.Document {
    // owner or listId?
    owner:String;
    itemList: [
        {
            serviceName: string,
            addDate: Date,
            dueDate: Date,
            price: number,
            isArchived: boolean,
        }]; 
}
export{ISubItemModel};