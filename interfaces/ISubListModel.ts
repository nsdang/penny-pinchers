import Mongoose = require("mongoose");

interface ISubListModel extends Mongoose.Document {
    listId : number;
    name: string;
    description: string;
    userId: number;
    items: [{
        serviceName: string,
        addDate: Date,
        dueDate: Date,
        price: number,
        isArchived: boolean,
    }]; 
}

export{ISubListModel};