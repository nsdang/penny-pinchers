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
            userId: Number
        }, { collection: 'subscriptionList' });
    };
    SubListModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("SubscriptionList", this.schema);
    };
    // retrieve all lists
    SubListModel.prototype.retrieveAllLists = function (response) {
        var query = this.model.find({});
        query.exec(function (err, lists) {
            response.json(lists);
        });
    };
    // retrieve a single list
    SubListModel.prototype.retrieveASingleList = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, list) {
            response.json(list);
        });
    };
    return SubListModel;
}());
exports.SubListModel = SubListModel;
