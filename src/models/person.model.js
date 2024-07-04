import mongoose, { Schema } from "mongoose";
import validator from "validator"
const userSchema = new Schema(
    {
        name: {
            type:String,
            required: [true,"Name is required"],
            trim: true,
            index: true
        },
        email: {
            type:String,
            required: [true,"Email is required"],
            unique: [true,"email already exist"],
            lowecase: true,
            trim: true,
            validate:[validator.isEmail,"Invalid Email Address"]
        },
        address: {
            type:String,
            required: [true,"Email is required"]
            
        },
      
    },
    {
        timestamps: true
    }
)



export const Person = mongoose.model("Person", userSchema)