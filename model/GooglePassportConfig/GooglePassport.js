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
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;
var Keys_1 = require("./Keys");
var GooglePassport = /** @class */ (function () {
    function GooglePassport(User, SubscriptionList) {
        this.clientID = Keys_1["default"].clientID;
        this.clientSecret = Keys_1["default"].clientSecret;
        this.User = User;
        this.SubscriptionList = SubscriptionList;
        passport.use(new GoogleStrategy({
            clientID: this.clientID,
            clientSecret: this.clientSecret,
            callbackURL: "/auth/google/callback"
        }, function (token, tokenSecret, profile, done) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    User.checkIfUserExist({ userId: profile.id }).then(function (resolve) {
                        console.log(resolve);
                        if (resolve != null) {
                            console.log("user already exist");
                            return done(null, resolve);
                        }
                        else {
                            console.log("creating a new user");
                            // create a new user 
                            /*var newUser = {
                                userId: profile.id,
                                fname: profile.givenName,
                                lname: profile.familyName,
                                email : profile.emails[0].value,
                                isPremium: false,
                            }

                            User.model.create([newUser], (err) => {
                                if (err) {
                                    console.log("user creation failed");
                                }
                            });

                            // create a new list and assign to user
                            var listId = this.idGenerator;
                            var userList = {
                                listId : listId,
                                name: profile.givenName + "'s List",
                                description: "",
                                userId: profile.id,
                            }

                            SubscriptionList.model.create([userList], (err) => {
                                if (err) {
                                console.log("user creation failed");
                                }
                            });

                            console.log("hello");*/
                            //return done(null, profile);
                        }
                    });
                    return [2 /*return*/];
                });
            });
        })
        //var currentUser; 
        //async() => await User.retrieveASingleUser(currentUser, {userId : profile.id});
        //})
        );
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
    return GooglePassport;
}());
exports["default"] = GooglePassport;
