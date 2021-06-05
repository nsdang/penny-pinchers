"use strict";
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
            var currentUser;
            User.retrieveASingleUser(currentUser, { userId: profile.id });
            if (currentUser != null) {
                console.log("user already exist");
                return done(null, profile);
            }
            else {
                // create a new user 
                var newUser = {
                    userId: profile.id,
                    fname: profile.givenName,
                    lname: profile.familyName,
                    email: profile.emails[0].value,
                    isPremium: false
                };
                User.model.create([newUser], function (err) {
                    if (err) {
                        console.log("user creation failed");
                    }
                });
                // create a new list and assign to user
                var listId = this.idGenerator;
                var userList = {
                    listId: listId,
                    name: profile.givenName + "'s List",
                    description: "",
                    userId: profile.id
                };
                SubscriptionList.model.create([userList], function (err) {
                    if (err) {
                        console.log("user creation failed");
                    }
                });
                console.log("hello");
                return done(null, profile);
            }
        }));
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
