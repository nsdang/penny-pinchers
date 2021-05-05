"use strict";
exports.__esModule = true;
exports.SubItemModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var SubItemModel = /** @class */ (function () {
    function SubItemModel() {
        this.createSchema();
        this.createModel();
    }
    SubItemModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            listId: Number,
            itemList: [
                {
                    itemId: Number,
                    serviceName: String,
                    addDate: Date,
                    dueDate: Date,
                    price: Number,
                    isArchived: Boolean
                }
            ]
        }, { collection: 'subscriptionItems' });
    };
    SubItemModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("SubscriptionItems", this.schema);
    };
    // we call this and passing in the listId to get all the items
    SubItemModel.prototype.retrieveAllItems = function (response, filter) {
        var query = this.model.findOne(filter); // return one list with listId
        query.exec(function (err, items) {
            response.json(items);
        });
    };
    // retrieve a single item detail
    SubItemModel.prototype.retrieveItemDetails = function (response, filter, itemid) {
        var query = this.model.findOne(filter);
        query.exec(function (err, list) {
            var itemDetail = list.itemList.find(function (i) { return i.itemId === itemid; });
            response.json(itemDetail);
        });
    };
    return SubItemModel;
}());
exports.SubItemModel = SubItemModel;