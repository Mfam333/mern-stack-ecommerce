import Product from "../models/Products.models.js"
import redisdatadb from "../mongodb/Redis.js"
import cloudinary from "../mongodb/Cloudinary.js"
export const Getproducts=async (req,res)=>{
    try{
 const products= await Product.find()
 console.log(products)
  res.json(products)
    }catch(error){

        console.log(error.message)
        return res.status(404).json({success:false,message:error.message})
    }
}

export const Getfeatureproducts= async (req,res)=>{
    try{
let featuresproduct= await redisdatadb.get("feature_product")
if(featuresproduct){
return res.json(JSON.parse(featuresproduct))}
//if not in redis
//lean() is going to return a plain javascript object instead of a mongodb document which is good for performance
featuresproduct=await Product.find({isfeatured:true}).lean()
if(!featuresproduct){
  return  res.status(404).json({success:false,message:"no feature product found"})
}
//store in redis for feature access
await redisdatadb.set("feature_product",featuresproduct)
return res.json(featuresproduct)
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:"server error",error:error.message})
    }
}

export const CreateProducts= async (req,res)=>{
    const {name,description,price,image,category}=req.body
    try{
   let cloudinaryresponse=null
   if(image){
    cloudinaryresponse= await cloudinary.uploader.upload(image,{folder:"products"})
   await Product.create({
    name,
    description,
    price ,
    image:cloudinaryresponse?.secure_url?cloudinaryresponse.secure_url:"",
    category
   })
   }else{
    res.json({message:"created"})
   }
   
    }catch(error){
        console.log("error",error.message)
    res.status(500).json({success:false,message:"server error",error:error.message})
    }

}

export const DeleteProducts= async (req,res)=>{
    try{
     const product= await Product.findById(req.params.id)
     if(!product){
        return res.status(404).json({success:false,message:"product not found"})
     }
     if(product.image){
        const publicId=product.image.split("/").pop().split(".")[0]//this will get the id of the image to be deleted
     
     try{
     await cloudinary.uploader.destroy(`products/${publicId}`)
     console.log("delete cloudinary")
     }catch(error){
       console.log("error deleting image from cloudinary",error.message)
     }}
     await Product.findByIdAndDelete(req.params.id)
     res.status(200).json({success:true,message:"product deleted"})
    }catch(error){
        console.log("error",error.message)
 res.status(500).json({success:false,message:"server error",error:error.message})
    }
}

export const GetrecommendedProducts= async (req,res)=>{
 try{
   const products= await Product.aggregate([{$sample:{size:4}

   },{$project:{
    _id:1,
    name:1,
    description:1,
    image:1,
    price:1,
   }}])
res.json(products)
 }catch(error){
console.log("error",error.message)
 res.status(500).json({success:false,message:"server error",error:error.message}) 
 }
}

export const GetproductsCategory= async(req,res)=>{
    const {category}=req.params
    try{
        const product= await Product.find({category})
    if(!product){
        return res.status(404).json({success:false,message:"product with that category"})
    }
    res.json({product})

    }catch(error){
    console.log("error",error.message)
 res.status(500).json({success:false,message:"server error",error:error.message}) 
    }
}

export const ToggleFeatureProduct= async (req,res)=>{
    try{
        const product= await Product.findById(req.params.id)
        if(product){
            product.isfeatured=!product.isfeatured
            const updatedproduct= await product.save()
            await updatedproductfeaturedCache()
            res.json(updatedproduct)
        }else{
            res.status(404).json({success:false,message:"no product found"})
        }

    }catch(error){
 console.log("error",error.message)
 res.status(500).json({success:false,message:"server error",error:error.message}) 
    }
}

async function updatedproductfeaturedCache(){
try{
const featureproducts= await Product.find({isfeatured:true}).lean()
await redisdatadb.set("feature_product",JSON.stringify(featureproducts))
}catch(error){
 console.log("error",error.message)
 res.status(500).json({success:false,message:"server error",error:error.message}) 
}
}