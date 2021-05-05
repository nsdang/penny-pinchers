import Mongoose = require("mongoose");

interface ISubListModel extends Mongoose.Document {
    listId : number;
    name: string;
    description: string;
    userId: number;
}

export{ISubListModel};