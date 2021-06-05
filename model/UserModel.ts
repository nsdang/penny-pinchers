import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                userId : {type: String, required: true, unique: true},
                fname: String,
                lname: String,
                creditcardInfo:{
                    cardNo: Number,
                    cvv: Number,
                },
                isPremium: Boolean,
                phoneNo: String,
                email: String,
            }, {collection: 'UserList'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }

    // retrieve info of a single user
    public async retrieveASingleUser(filter: Object) : Promise<any> {
        var query = this.model.findOne(filter);
        // await query.exec((err, user) => {      
        //     if(user == null) {
        //          console.log("Creating a new user");
        //          return null; 
        //     }
        //      console.log("User already existed");
        //      return user; 
        // });
        var user; 
        const promise = new Promise((resolve, reject) => {
            query.exec((err, user) => { 
            })

        }).then(() => {
            if(user == null) {
                console.log("Creating a new user");
                 return null;
            }

            console.log("User already existed");
            return user; 
        })

        return promise; 
    }

    // modify info of a single user
    public updateUserInfo (response: any, filter: Object, reqBody: Object ) : any {
        var query = this.model.findOneAndUpdate(filter, reqBody);
        query.exec((err, result) => {
            if (err) {
                console.log("Error of update: ");
                console.log(err);
            }
            response.json(result);
        });
    }

    

}
export {UserModel};