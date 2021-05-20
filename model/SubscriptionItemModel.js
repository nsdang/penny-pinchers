"use strict";
exports.__esModule = true;
exports.SubscriptionItemModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var SubscriptionItemModel = /** @class */ (function () {
    function SubscriptionItemModel() {
        this.createSchema();
        this.createModel();
    }
    SubscriptionItemModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            listId: Number,
            itemId: Number,
            serviceName: String,
            addDate: Date,
            dueDate: Date,
            price: Number,
            isArchived: Boolean,
            subscriptionType: String
        }, { collection: "subscriptionItems" });
    };
    SubscriptionItemModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("SubscriptionItems", this.schema);
    };
    // Get all items
    SubscriptionItemModel.prototype.retrieveAllItems = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, items) {
            response.json(items);
        });
    };
    // Retrieve a single item detail
    SubscriptionItemModel.prototype.retrieveItemDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, item) {
            response.json(item);
        });
    };
    // Update a single item detail
    SubscriptionItemModel.prototype.updateItemDetails = function (response, conditionDetail, updateDetail) {
        var condition = conditionDetail;
        var update = updateDetail;
        this.model.findOneAndUpdate(condition, update, function (err, doc) {
            if (err) {
                console.log("object update failed");
                return;
            }
            response.json(doc);
        });
    };
    // Delete a single item
    SubscriptionItemModel.prototype.deleteItem = function (response, filter) {
        this.model.deleteOne(filter, function (error, mongooseDeleteResult) {
            if (error) {
                console.log(error);
                return;
            }
            response.json(mongooseDeleteResult);
        });
    };
    return SubscriptionItemModel;
}());
exports.SubscriptionItemModel = SubscriptionItemModel;
