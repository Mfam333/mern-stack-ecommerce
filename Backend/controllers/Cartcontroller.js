import Product from "../models/Products.models.js"

export const Addtocart=async (req,res)=>{
    try{
        const {productId}=req.body
        const user=req.user
 const existingitem=user.cartItems.find(item=>item.id===productId)
 console.log(existingitem)
 if(existingitem){
    existingitem.quantity+=1
 }
 else{
    user.cartItems.push(productId)
 }
 await user.save()
 res.json(user.cartItems)
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:"server error",error:error.message})
    }

}

export const getCartItem=async (req,res)=>{
    try{
const products= await Product.find({_id:{$in:req.user.cartItems}})
//add quantity for each product
const cartItems=products.map(product=>{
    const item=req.user.cartItems.find(cartitem=>cartitem.id===product.id)
    console.log(item)
    return {...product.toJSON(),quantity:item.quantity}
})
res.json(cartItems)
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:"server error",error:error.message}) 
    }

}

export const RemoveAll=async(req,res)=>{
    try{
     const {productId}=req.body
    const user=req.user
    if(!productId){
        user.cartItems=[]
    }
    else{
        user.cartItems=user.cartItems.filter((item)=>item.id!==productId)
    }
    await user.save()
    res.json(user.cartItems)
    }catch(error){
      console.log(error.message)
      res.status(500).json({success:false,message:"server error",error:error.message})  

    }

}

export const UpdateQuantity=async(req,res)=>{
    try{
 const {id:productId}=req.params
 const {quantity}=req.body
 const user=req.user
 const existingitem=user.cartItems.find((item)=>item.id===productId)
 if(existingitem){
    if(quantity===0){
        user.cartItems=user.cartItems.filter((item)=>item.id!==productId)
        await user.save()
        res.json(user.cartItems)
    }
    existingitem.quantity=quantity
    await user.save()
    res.json(user.cartItems)
 }else{
    res.status(404).json({message:"product not found in the cart"})
 }
    }catch(error){
      console.log(error.message)
      res.status(500).json({success:false,message:"server error",error:error.message})    
    }

}