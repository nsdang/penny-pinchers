import Mongoose = require("mongoose");

interface ISubscriptionListModel extends Mongoose.Document {
    listId : number;
    name: string;
    description: string;
    userId: number;
}

export{ISubscriptionListModel};