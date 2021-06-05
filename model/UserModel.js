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
            userId: { type: String, required: true, unique: true },
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
    UserModel.prototype.retrieveASingleUser = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, user) {
            response.json(user);
        });
    };
    // retrieve info of a single user
    UserModel.prototype.checkIfUserExist = function (filter) {
        var query = this.model.findOne(filter);
        return new Promise(function (resolve, reject) {
            query.exec(function (err, user) {
                if (user == null) {
                    resolve(null);
                }
                resolve(user);
            });
        });
    };
    // modify info of a single user
    UserModel.prototype.updateUserInfo = function (response, filter, reqBody) {
        var query = this.model.findOneAndUpdate(filter, reqBody);
        query.exec(function (err, result) {
            if (err) {
                console.log("Error of update: ");
                console.log(err);
            }
            response.json(result);
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
