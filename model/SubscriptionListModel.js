"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SubscriptionListModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var SubscriptionListModel = /** @class */ (function () {
    function SubscriptionListModel() {
        this.createSchema();
        this.createModel();
    }
    SubscriptionListModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            listId: Number,
            name: String,
            description: String,
            userId: String
        }, { collection: "SubscriptionList" });
    };
    SubscriptionListModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("SubscriptionList", this.schema);
    };
    // retrieve last user's listId
    SubscriptionListModel.prototype.getLastListId = function () {
        var query = this.model.findOne().sort({ listId: 'descending' });
        return new Promise(function (resolve, reject) {
            query.exec(function (err, list) {
                resolve(list.listId);
            });
        });
    };
    // retrieve all lists
    SubscriptionListModel.prototype.retrieveAllLists = function (response) {
        var query = this.model.find({});
        query.exec(function (err, lists) {
            response.json(lists);
        });
    };
    // retrieve a single list's info
    SubscriptionListModel.prototype.retrieveListInfo = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, list) {
            response.json(list);
        });
    };
    // return a single list based on listId
    SubscriptionListModel.prototype.returnOwnerId = function (filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, list) {
            return new Promise(function (resolve, reject) {
                query.exec(function (err, list) {
                    resolve(list.userId);
                });
            });
        });
    };
    // retrieve a single list ID given an object
    SubscriptionListModel.prototype.retrieveListId = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = this.model.findOne(filter);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        query.exec(function (err, list) {
                            resolve(list.listId);
                        });
                    })];
            });
        });
    };
    // update list's info
    SubscriptionListModel.prototype.updateListInfo = function (response, filter, reqBody) {
        var query = this.model.findOneAndUpdate(filter, reqBody);
        query.exec(function (err, result) {
            if (err) {
                console.log("Error of update: ");
                console.log(err);
            }
            response.json(result);
        });
    };
    return SubscriptionListModel;
}());
exports.SubscriptionListModel = SubscriptionListModel;
