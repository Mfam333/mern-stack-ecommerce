import {create} from "zustand"
import toast from "react-hot-toast"
import axios from "../lib/Axios"

 const useproductStore=create((set)=>({
 products:[],
 loading:false,

/*setProducts:products=>set({products}),
 createProduct: async(productdata)=>{
    set({loading:true});

    try{
const res= await axios.post("/product",productdata);
 set((prevState)=>({
    products:[...prevState.products,res.data],
    loading:false
 }));
    }catch(error){
        console.log(error.message)
        toast.error(error.response.data.error)
        set({loading:false})


    }
 }*/



 createProduct:async ({name,description ,price,category,image})=>{
   set({loading:true});
  
   try{
     const res= await axios.post("/product",{name,description,price,category,image})
     set({user:res.data,loading:false})
     console.log(res.data)
    
   }catch(error){
    console.log(error.message)
    set({loading:false})
    toast.error(error.response.data.error|| "an error occurred")

   }
   
 },
fetchAllProduct: async()=>{
   set({loading:true})
   try{
const res= await axios.get("/product")
console.log(res)
set({products:res.data,loading:false})
   }catch(error){
 set({error:"fail to fetch products",loading:false})
toast.error(error.response.data.error||"failed to fetch products")
   }

},
deleteProduct: async(productId)=>{
   set({loading:true})
   try{
      await axios.delete(`/product/${productId}`)
      set((prevProducts)=>({
         products:prevProducts.products.filter(product=>product._id!==productId),
         loading:false
      }))
   }catch(error){
      toast.error({error:error.response.data.error||"failed to delete product"})
     
   }

},

addFeaturedProduct: async(productId)=>{
   set({loading:true})
   try{
const res= await axios.put(`/product/${productId}`)
//this is will update the isfeatured props of the product of the store
set((prevProducts)=>({
   products:prevProducts.products.map(product=>{
      product._id===productId?{...product,isfeatured:response.data.isfeatured}:product
   }),
   loading:false
}))
   }catch(error){
      set({loading:false})

   }

},
fetchProductByCategory: async(category)=>{
   set({loading:true});

   try{
const res=await axios.get(`/product/category/${category}`)
set({loading:false,products:res.data.product})
   }catch(error){
      set({error:"failed to fetch product",loading:false});
      toast.error(error.response.data.error||"failed to fetch products")


   }
   
},

fetchfeaturedProducts: async()=>{
   set({loading:true})
try{
   const res= await axios.get("/product/feature")
   set({products:res.data,loading:false})

}catch(error){
   console.error("there was error fetchin featured product",error)
   set({error:"failed to load featured products",loading:false})
}


}

}))

export default useproductStore

