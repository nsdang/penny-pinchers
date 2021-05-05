import Mongoose = require("mongoose");

interface ISubListModel extends Mongoose.Document {
    listId : number;
    name: string;
    description: string;
    userId: number;
    itemList: [{
        itemId: number,
        serviceName: string,
        addDate: Date,
        dueDate: Date,
        price: number,
        isArchived: boolean,
        type: string,
    }]; 
}

export{ISubListModel};