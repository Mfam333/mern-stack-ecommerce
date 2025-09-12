import User from "../models/User.model.js"
import jwt from "jsonwebtoken"
export const protectedRoute=async(req,res,next)=>{
try{
 const accessToken=req.cookies.accessToken
 if(!accessToken){
    return res.status(401).json({sucess:false,message:"unauthorized"})
 }
 try{const decoded=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
 const user= await User.findById(decoded.userId).select("-password")
 if(!user){
     return res.status(401).json({sucess:false,message:"user not found"})
 }
 req.user=user
 next()
}catch(error){
    if(error.name=="TokenEpiredError"){
    console.log("error",error.message)
    res.status(401).json({sucess:false,message:"unauthorized access token expired"})}
    throw error
}}catch(error){
 res.status(500).json({sucess:false,message:"server error",error:error.message})}
}


export const AdminRoute= async(req,res,next)=>{
    try{
    if(req.user&&req.user.role==="admin"){
      
      res.status(200).json({sucess:true,message:"access"})
    } 
    next()


    }catch(error){
        console.log(error.message)
     res.status(500).json({sucess:false,message:"server error",error:error.message})
    }
}