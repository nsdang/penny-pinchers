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
                ssoId: {type: String, required: true, unique: true},
                userId : {type: Number, required: true, unique: true},
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
            response.json(result);
        });
    }

    

}
export {UserModel};