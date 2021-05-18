import Mongoose = require("mongoose");

interface ISubItemModel extends Mongoose.Document {
    listId: Number,
    itemId: Number,
    serviceName: String,
    addDate: Date,
    dueDate: Date,
    price: Number,
    isArchived: Boolean,
    subscriptionType: String
}
export{ISubItemModel};