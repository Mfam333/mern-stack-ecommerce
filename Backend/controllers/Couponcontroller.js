import Coupons from "../models/coupons.model.js"
export const Getcoupon=async(req,res)=>{
    try{
 const coupon= await Coupons.findOne({userId:req.user._id,isActive:true})
 res.json(coupon)
    }catch(error){
 console.log("error",error.message)
 res.status(500).json({success:false,message:"server error",error:error.message})   
    }
}

export const Validatecoupon=async (req,res)=>{
    try{
 const {code}=req.body
 const coupon= await Coupons.findOne({code:code,userId:req.user._id,isActive:true})
 if(!coupon){
    res.status(404).json({message:"coupon not found"})
 }
 if(coupon.expirationDate<new Date()){
    coupon.isActive=false
    await coupon.save()
    res.status(400).json({message:"coupon expired"})
 }
 res.json({
    message:"coupon is valid",
    code:coupon.code,
    dicounpercentage:coupon.discountpercentage
 })
    }catch(error){
 console.log("error",error.message)
 res.status(500).json({success:false,message:"server error",error:error.message})   
     
    }
}