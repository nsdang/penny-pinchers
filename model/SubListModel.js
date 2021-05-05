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
            itemList: [
                {
                    itemId: Number,
                    serviceName: String,
                    addDate: Date,
                    dueDate: Date,
                    price: Number,
                    isArchived: Boolean
                },
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
            console.log(list);
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
    return SubListModel;
}());
exports.SubListModel = SubListModel;
