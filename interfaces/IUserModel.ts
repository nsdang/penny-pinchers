import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: number;
    username: string;
    password: string;
    fname: string;
    lname: string;
    creditcardInfo: {
        cardNo: number;
        cvv: number;
    }
    isPremium: boolean;
    phoneNo: string;
    email: string;
}
export {IUserModel};