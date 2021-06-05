"use strict";
exports.__esModule = true;
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;
var Keys_1 = require("./Keys");
var GooglePassport = /** @class */ (function () {
    function GooglePassport() {
        this.clientID = Keys_1["default"].clientID;
        this.clientSecret = Keys_1["default"].clientSecret;
        passport.use(new GoogleStrategy({
            clientID: this.clientID,
            clientSecret: this.clientSecret,
            callbackURL: "/auth/google/callback"
        }, function (req, token, tokenSecret, profile, done) {
            //User.findOrCreate({ googleId: profile.id }, function (err, user) {
            console.log(profile);
            return done(null, profile);
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
