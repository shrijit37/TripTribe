import mongoose, { Schema, mongo } from "mongoose";

const userSchema = mongoose.Schema(
    {
        fname:{
            type:String,
            required:true,
        },
        lname:{
            type:String,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        userInterest:{
            type:Array,
        },
        userAddress:{
            type:String,
        }
    },{timestamps:true}
);

const User = mongoose.model('User',userSchema);

export default User;