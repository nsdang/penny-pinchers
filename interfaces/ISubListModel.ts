import Mongoose = require("mongoose");

interface ISubListModel extends Mongoose.Document {
    listId : number;
    name: string;
    description: string;
    owner: string
}

export{ISubListModel};