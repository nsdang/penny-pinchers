import Mongoose = require("mongoose");

interface ISubscriptionItemModel extends Mongoose.Document {
    listId: Number,
    itemId: Number,
    serviceName: String,
    addDate: Date,
    dueDate: Date,
    price: Number,
    isArchived: Boolean,
    subscriptionType: String,
    recurringOption: String;
    reminderMethod: String;
}
export{ISubscriptionItemModel};