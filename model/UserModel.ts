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
                userId: Number,
                username: String,
                password: String,
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

    /*** should be deleted */
    public retrieveAllUsers(response:any): any {
        var query = this.model.find({});
        query.exec( (err, userArray) => {
            response.json(userArray) ;
        });
    }

    /*** should be deleted */
    public retrieveUserCount(response:any): any {
        console.log("retrieve User Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec( (err, numberOfUsers) => {
            console.log("numberOfUsers: " + numberOfUsers);
            response.json(numberOfUsers) ;
        });
    }

    // retrieve info of a single user
    public retrieveASingleUser(response: any, filter: Object) : any {
        var query = this.model.findOne(filter);
        query.exec((err, user) => {
            response.json(user);
          });
    }

    // modify info of a single user
    public updateUserInfo (response: any, filter: Object, reqBody: Object ) : any {
        var query = this.model.findOneAndUpdate(filter, reqBody);
        query.exec((err, result) => {
            if (err) {
                console.log("Error of update: ");
                console.log(err);
            }
            
        });
        // query to return json file of the updated document
        var check_result_query = this.model.find(filter);
        check_result_query.exec((err, updated_user) => {
            if (err) {
                console.log("Error of confirm update: ");
                console.log(err);
            }
            response.json(updated_user);
        });

    }

    

}
export {UserModel};