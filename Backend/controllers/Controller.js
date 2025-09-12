
import User from "../models/User.model.js"
import  jwt from "jsonwebtoken"
import redisdatadb from "../mongodb/Redis.js"
const generateTokens=(userId)=>{
    const accesstokens= jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m",

    })
console.log(userId)
   const refreshtokens= jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"7d",

    })

    return {accesstokens,refreshtokens}
 

}

const storedtoken=async (userId,refreshtokens)=>{
    console.log(userId,"iiuu")
    await redisdatadb.set(`refresh_token:${userId}`,refreshtokens,"EX",7*24*60*60);
}
const Setcookie=(res,accesstokens,refreshtokens)=>{
    res.cookie("accessToken",accesstokens,{
        httpOnly:true, //prevent xss attack
        secure:process.env.NODE_ENV==="production",
        sameSite:true ,//prevent csfr attack
        maxAge:15*60*1000,

    })

    res.cookie("refreshToken",refreshtokens,{
        httpOnly:true, //prevent xss attack
        secure:process.env.NODE_ENV==="production",
        sameSite:true ,//prevent csfr attack
        maxAge:7*24*60*60*1000,

    })


}
export const Signupuser= async (req,res)=>{
    const {name,password,email}=req.body
    try{
       
    const existinguser= await User.findOne({email})
    if(existinguser){
        return res.status(400).json({success:true,message:"user already existed with the provided email"})
    }
  const user= await User.create({
    name,password,email
  })

  const {accesstokens,refreshtokens}=generateTokens(user._id)
  console.log(user._id)
   await storedtoken(user._id,refreshtokens)
   Setcookie(res,accesstokens,refreshtokens)
  res.status(201).json({ success:true, message:"you have sign up successfully",user:{
    _d:user._id,
    name:user.name,
    email:user.email,
    password:user.password=undefined,
    role:user.role
  }})
}catch(error){
    console.log(error.message)
    res.status(400).json({success:false,message:error.message})
}
}

export const Loginuser= async (req,res)=>{
    const {password,email}=req.body
 try{
const existinguser= await User.findOne({email})
if(!existinguser){
return res.status(400).json({ success:true, message:"user does not exist"})
}
if(existinguser&& (await existinguser.comparepassword(password))){
const {accesstokens,refreshtokens}=generateTokens(existinguser._id)
 await storedtoken(existinguser._id,refreshtokens)
  Setcookie(res,accesstokens,refreshtokens)
  return res.status(200).json({ success:true, message:"you have successfully login",existinguser:{
    _d:existinguser._id,
    name:existinguser.name,
    email:existinguser.email,
    role:existinguser.role}})

}
 res.status(400).json({ success:true, message:"you have invalide credentials"})
 }catch(error){
 res.status(500).json({ success:false, message:"server error",error:error.message})
 }
    
}

export const Logoutuser= async (req,res)=>{
 try{
    const refreshToken=req.cookies.refreshToken
    if(refreshToken){
        const decoded= jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
        console.log(decoded)
        console.log(decoded.userId)
        await redisdatadb.del(`refresh_token:${decoded.userId}`)
    }
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    res.status(200).json({success:true,message:"user logout successfully"})

 }catch(error){
    res.status(500).json({ success:false, message:"server error",error:error.message})
 }
    
}

export const RefreshToken= async (req,res)=>{
    try{

        const refreshtoken=req.cookies.refreshToken
        console.log(refreshtoken)
        if(!refreshtoken){
          return res.status(401).json({success:false,message:"no refreshtoken provided"}) 
        }
        const decoded=jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_SECRET)
        const storedtoken= await redisdatadb.get(`refresh_token:${decoded.userId}`)
        if(storedtoken!==refreshtoken){
            return res.status(401).json({success:false,message:"invalid token"}) 
        }
        const accesstokens=jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
         res.cookie("accessToken",accesstokens,{
        httpOnly:true, //prevent xss attack
        secure:process.env.NODE_ENV==="production",
        sameSite:true ,//prevent csfr attack
        maxAge:15*60*1000,
    })
    res.json({message:"token refresh successfully"})


    }catch(error){
        console.log(error.message)
       return res.status(500).json({success:false,message:"server error",error:error.message})  
    }
}
export const Getprofile= async (req,res)=>{
    try{
   res.json(req.user)
    }catch(error){
        console.log(error.message)
       return res.status(500).json({success:false,message:"server error",error:error.message})
        }}