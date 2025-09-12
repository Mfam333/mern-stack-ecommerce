import {create} from "zustand"
import axios from "../lib/Axios"
import toast from "react-hot-toast"

export const useCartStore= create((set,get)=>({
    cart:[],
    loading:false,
    total:0,
    subtotal:0,
    coupon:null,
    isCouponApplied:false,

    getCouponCode: async ()=>{
      try{
      const res= await axios.get("/coupons")
      set({coupon:res.data})
      console.log("this is coupon code")
      }catch(error){
        console.error("error fetching coupon",error)
      }
    },
ApplyCoupon: async (code)=>{
 try{
 const res= await axios.post("/coupons/validate",{code})
 set({coupon:res.data,isCouponApplied:true})
 get().calculateTotal()
 toast.success("applied successfully");
 }catch(error){
  toast.error(error.response?.data?.message||"failed to apply coupon")

 }
},

RemoveCoupon:()=>{
set({coupon:null,isCouponApplied:false});
get().calculateTotal()
toast.success("coupon removed")

},
 getCartItems:async ()=>{
   set({loading:true});
   console.log("get cart item")
  
   try{
     const res= await axios.get("/cart")
     set({cart:res.data,loading:false})
     get().calculateTotal()
     console.log(res)
     console.log('cart item')
   }catch(error){
    console.log(error.message)
    set({loading:false})
    set({cart:[]})
    toast.error(error.response.data.message|| "an error occurred")

   }
   
 },
 AdditemToCart:async(product)=>{
 
 try{
const res=await axios.post("/cart",{productId:product._id})
          toast.success("product added to cart")

          set((prevState)=>{
            const existingitem=prevState.cart.find((item)=>item._id===product._id);
            const newcart=existingitem
            ?prevState.cart.map((item)=>(item._id===product._id)?{...item,quantity:item.quantity+1}:item)
            :[...prevState.cart,{...product,quantity:1}]
            return {cart:newcart}
          })
          get().calculateTotal()
          // window.location.reload()
 }catch(error){

    toast.error(error.response.data.message|| "an error occurred")
 }
 
 },

RemoveFromCart:async(productId)=>{
 
 try{
const res=await axios.delete("/cart", {data:{productId}})
         set({loading:true})
          toast.success("product deleted")
          set((prevState)=>({cart:prevState.cart.filter(item=>item._id!==productId),
            loading:false
            
          }))
          get().calculateTotal()
 }catch(error){

    toast.error(error.response.data.message|| "an error occurred")
 }
 
 },
ClearCart:async()=>{
set({cart:[],total:0,coupon:null,subtotal:0})
},
UpdateCartQuantity:async(productId,quantity)=>{
  if(quantity===0){
    get().RemoveFromCart(productId)
    return
  }
 
 try{
const res=await axios.put(`cart/${productId}`,{quantity} )
         set({loading:true})
          toast.success("product deleted", {id:"mm"})
          set((prevState)=>({cart:prevState.cart.map(item=>item._id===productId ?{...item,quantity}:item),
            loading:false
            
          }))
          get().calculateTotal()
 }catch(error){

    toast.error(error.response.data.message|| "an error occurred")
 }
 
 },


calculateTotal:()=>{
    const {cart,coupon}=get()
   const subtotal=cart.reduce((sum,item)=>sum+item.price*item.quantity,0)
   let total=subtotal
   if(coupon){
    const discount=subtotal*(coupon.discountPercentage/100);
    total=subtotal-discount
   }
   set({subtotal,total})
},





}))
