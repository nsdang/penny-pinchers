"use strict";
exports.__esModule = true;
exports.SubListModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var SubListModel = /** @class */ (function () {
    function SubListModel() {
        this.createSchema();
        this.createModel();
    }
    SubListModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            listId: Number,
            name: String,
            description: String,
            userId: Number,
            type: String,
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
        }, { collection: 'subscriptionList' });
    };
    SubListModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("SubscriptionList", this.schema);
    };
    // retrieve a single list filter by userId
    SubListModel.prototype.retrieveAllItems = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, list) {
            response.json(list);
        });
    };
    // retrieve all lists
    SubListModel.prototype.retrieveAllLists = function (response) {
        var query = this.model.find({});
        query.exec(function (err, lists) {
            response.json(lists);
        });
    };
    // retrieve a single item detail
    SubListModel.prototype.retrieveItemDetails = function (response, filter, itemid) {
        var query = this.model.findOne(filter);
        query.exec(function (err, list) {
            var itemDetail = list.itemList.find(function (i) { return i.itemId === itemid; });
            console.log(list);
            console.log(list.itemList);
            response.json(itemDetail);
        });
    };
    return SubListModel;
}());
exports.SubListModel = SubListModel;
