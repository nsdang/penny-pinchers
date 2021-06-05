import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    ssoId: string;
    userId: number; 
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