"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.createSchema();
        this.createModel();
    }
    UserModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: Number,
            username: String,
            password: String,
            fname: String,
            lname: String,
            creditcardInfo: {
                cardNo: Number,
                cvv: Number
            },
            isPremium: Boolean,
            phoneNo: String,
            email: String
        }, { collection: 'UserList' });
    };
    UserModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("User", this.schema);
    };
    /*** should be deleted */
    UserModel.prototype.retrieveAllUsers = function (response) {
        var query = this.model.find({});
        query.exec(function (err, userArray) {
            response.json(userArray);
        });
    };
    /*** should be deleted */
    UserModel.prototype.retrieveUserCount = function (response) {
        console.log("retrieve User Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec(function (err, numberOfUsers) {
            console.log("numberOfUsers: " + numberOfUsers);
            response.json(numberOfUsers);
        });
    };
    // retrieve info of a single user
    UserModel.prototype.retrieveASingleUser = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, user) {
            response.json(user);
        });
    };
    // modify info of a single user
    UserModel.prototype.updateUserInfo = function (response, filter, reqBody) {
        var query = this.model.findByIdAndUpdate(filter, reqBody);
        query.exec(function (err, result) {
            response.json(result);
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
