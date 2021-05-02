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
            owner: String
        });
    };
    SubListModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("SubscriptionList", this.schema);
    };
    // return the list details (name, desc,...)
    SubListModel.prototype.retrieveListDetails = function (response, filter) {
        var query = this.model.findOne(filter); // find the list according to owner/userId?
        query.exec(function (err, list) {
            response.json(list);
        });
    };
    return SubListModel;
}());
exports.SubListModel = SubListModel;
