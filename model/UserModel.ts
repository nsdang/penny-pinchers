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
            }, {collection: 'users'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("Users", this.schema);
    }

    public retrieveAllUsers(response:any): any {
        var query = this.model.find({});
        query.exec( (err, userArray) => {
            response.json(userArray) ;
        });
    }

    public retrieveUserCount(response:any): any {
        console.log("retrieve User Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec( (err, numberOfUsers) => {
            console.log("numberOfUsers: " + numberOfUsers);
            response.json(numberOfUsers) ;
        });
    }

}
export {UserModel};