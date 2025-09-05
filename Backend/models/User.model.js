import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Userschema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim:true,
        lowcase:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password must be at least 6 characters long"]
    },
    cartItems:[{
        quantity:{
            type:Number,
       default:1
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    }
    ],
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    }

    
},{timestamps:true})


Userschema.pre("save" ,async function(next){
 if(!this.isModified("password")) return next()
    try{
this.password= await bcrypt.hash(this.password,10)
next()
}catch(error){
    next(error)
    console.log(error.message)
}
})
Userschema.methods.comparepassword= async function (password){
    return bcrypt.compare(password,this.password)
}

const User=mongoose.model("user",Userschema)
export default User