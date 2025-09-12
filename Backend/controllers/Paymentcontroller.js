import Coupons from "../models/coupons.model.js"
import { stripe } from "../mongodb/Stripe.js"
import Order from "../models/orders.model.js"
export const CheckoutSession= async (req,res)=>{
    const isProduction = process.env.NODE_ENV === "production";

const clientUrl = isProduction
  ? process.env.PROD_CLIENT_URL
  : process.env.LOCAL_CLIENT_URL;

    const {products,couponCode}=req.body
    try{

if(!Array.isArray(products)||products.length===0){
  return  res.status(400).json({message:"invalide or empty product array"})
}
let totalAmount=0
const lineItems=products.map(product=>{
    //stripe wants you to send in the format of cent
    const amount= Math.round(Number(product.price*100));//cent=>$10*100=1000
    totalAmount+=product.quantity*amount
    return {
        price_data:{
            currency:"usd",
            product_data:{
                name:product.name,
                images:[product.image],
            },
            unit_amount:amount},
             quantity:product.quantity||1

    }
})
let coupon=null
if(couponCode){
    coupon= await Coupons.findOne({code:couponCode,userId:req.user._id,isActive:true})
    if(coupon){
        totalAmount-=Math.round(totalAmount*coupon.discountpercentage/100)
    }
}
const session= await stripe.checkout.sessions.create({
    payment_method_types:["card",],
    line_items:lineItems,
    mode:"payment",
    success_url:`${clientUrl}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:`${clientUrl}/purchase-cancel`,
    discounts:coupon
    ?[{coupon:await createStripeCoupon(coupon.discountpercentage),},]:[],
    metadata:{
        User_id:req.user._id.toString(),
        couponCode:couponCode||"",
        products:JSON.stringify(
            products.map((product)=>({
                id:product._id,
                quantity:product.quantity,
                price:product.price,
            }))

        )
    }
})
 /*totalAmount+=lineItems.reduce((sum,product)=>{
    return sum+(unit_amount*product.quantity)
 })*/
if(totalAmount>=20000){
    await createNewcoupon(req.user._id)
}
console.log("this is session",session)
 res.status(200).json({id:session.id,totalAmount:totalAmount/100})
    }catch(error){
        console.log(error)
console.log("error at payment",error.message)
 res.status(500).json({success:false,message:"server error",error:error.message})    
    }
    
}

async function createStripeCoupon(discountpercentage){
        const coupon=await stripe.coupons.create({
            percent_off:discountpercentage,
            duration:"once"
        })
        return coupon.id
    }

    async function createNewcoupon (userId) {
        await Coupons.findOneAndDelete({userId})
        const newcoupon= new Coupons({
            code:"Gift"+Math.random().toString(36).substring(2,8).toUpperCase(),
            discountpercentage:10,
            expirationDate:new Date(Date.now()+30*24*60*60*1000),//30 days from now
            userId:userId
        })
       await newcoupon.save()
       return newcoupon
    }


    export const CheckoutSuccess= async(req,res)=>{
        const {sessionId}=req.body
        try{
      const session= await stripe.checkout.sessions.retrieve(sessionId)
      if(session.payment_status==="paid"){
        if(session.metadata.couponCode){
            await Coupons.findOneAndUpdate({
            code:session.metadata.couponCode,userId:session.metadata.userId
            },{isActive:false})
        }
        //create a new order
const products=JSON.parse(session.metadata.products)
 const neworder= new Order({
    user:session.metadata.userId,
    product_data:products.map((product)=>({
                product:product._id,
                quantity:product.quantity,
                price_data:product.price,
            })),
            totalamount:session.amount_total/100, //convert from cent to dollar
            stripesessionId:sessionId           
 })   
 await neworder.save()

 res.status(200).json({success:true,message:"payment successful,order created and coupon code deactivated if used",
    orderId:neworder._id})
      }
        }catch(error){
            console.log("error",error.message)
            res.status(500).json({success:false,message:"server error",error:error.message})    
        }
    }