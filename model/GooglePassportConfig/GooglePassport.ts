var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;
import Keys from "./Keys"
import {UserModel} from "../UserModel"
import { SubscriptionListModel } from "../SubscriptionListModel";

class GooglePassport {

    clientID: string;
    clientSecret: string;
    User: UserModel;
    SubscriptionList : SubscriptionListModel;

    constructor(User: UserModel, SubscriptionList : SubscriptionListModel){

        this.clientID = Keys.clientID;
        this.clientSecret = Keys.clientSecret;
        this.User = User;
        this.SubscriptionList = SubscriptionList;

        passport.use(
            new GoogleStrategy({
                clientID: this.clientID,
                clientSecret: this.clientSecret,
                callbackURL: "/auth/google/callback"
            },
            function(token, tokenSecret, profile, done) {
                var currentUser; 
                User.retrieveASingleUser(currentUser, {userId : profile.id});
                console.log(currentUser);
                if(currentUser != null) {
                    console.log("user already exist");
                    return done(null, profile);

                } else {
                    // create a new user 
                    var newUser = {
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

                    console.log("hello");
                    return done(null, profile);
                }
                
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user);
          });
          
          passport.deserializeUser(function(user, done) {
            done(null, user);
          });
    } 
  
} export default GooglePassport;



