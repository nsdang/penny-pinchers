import Mongoose = require("mongoose");

interface ISubItemModel extends Mongoose.Document {
    listId: number;
    itemList: [{
            serviceName: string,
            addDate: Date,
            dueDate: Date,
            price: number,
            isArchived: boolean,
    }]; 
}
export{ISubItemModel};