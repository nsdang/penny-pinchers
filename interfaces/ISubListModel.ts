import Mongoose = require("mongoose");

interface ISubListModel extends Mongoose.Document {
    name: string;
    description: string;
    owner: string
    ///itemList: HTMLAllCollection;
}

export{ISubListModel};