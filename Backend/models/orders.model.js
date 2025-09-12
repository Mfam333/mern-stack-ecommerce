import mongoose from "mongoose";
const OrderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false,
    },
    products:[{
        product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,

        },
        quantity:{
            type:Number,
            required:true,
            min:1,
        },
        price:{
            type:Number,
            required:true,
            min:0

        }

    }],
    totalamount:{
        type:Number,
        required:true,
        min:0
    },
    stripesessionId:{
        type:String,
        unique:true,
        required:true
    }

},{timestamps:true})

const Order=mongoose.model("order",OrderSchema)

export default Order