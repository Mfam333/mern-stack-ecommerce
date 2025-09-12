import { ArrowRight, CheckCircle, HandHeart } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useCartStore } from "../../stores/useCartStore"
import axios from "../../lib/Axios"
import  Confetti from "react-confetti"
const PurchaseSucessPage=()=>{

    const [isProcessing,setIsprocessing]=useState(true)
    const [error,setError]=useState(null)
    const {ClearCart}=useCartStore()
    
    useEffect(()=>{
 const HandlecheckoutSuccesss=async (sessionId) =>{
    try{
      await axios.post("/payments/checkout-success",{sessionId})
      setIsprocessing(false)
     ClearCart()
     
    }catch(error){
        console.log(error)
        setError("error loading checkout session",error)
    }finally{
        setError(false)
    }

};
const sessionId= new URLSearchParams(window.location.search).get("session_id")
// const id=JSON.stringify(sessionId)
console.log("this is session id two",sessionId)
 if(sessionId){
    
    HandlecheckoutSuccesss(sessionId)
    ClearCart()
}

    else{
        console.log("no session id to load")
        setIsprocessing(false)
    }
 
  
 },[ClearCart])
 if(isProcessing)return "processing...";
 if(error) return `error:${error}`
 
    return(
        <div className="h-screen flex items-center justify-center px-4">
        <Confetti width={
            window.innerWidth
        }
        height={
            window.innerHeight
        }
        gravity={0.1}
        style={{zIndex:99}}
        numberofpieces={700}
        recycle={false}
        />

            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
                <div className="p-6 sm:p-6">
                    <div className="flex justify-center">
                        <CheckCircle className="text-emerald-400 w-16 h-16 mb-4"/>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
                        purchase success
                    </h1>
                    <p className="text-gray-300 text-center mb-2">
                        thank you for your order.{"we're"}processing it now
                    </p>
                    <p className="text-emerald-400 text-cnter text-sm mb-6">
                     check your email for order details and updates
                    </p>
                    <div className="bg-gray-700 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Order Number</span>
                            <span className="text-sm font-semibold text-emerald-400">#456788</span> 
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Estimated Delivery</span>
                            <span className="text-sm font-semibold text-emerald-400">3-5 business days</span> 
                        </div>
                    </div>
                   <div className="space-y-4">
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg
                    transition duration-300 flex items-center justify-center">
                        <HandHeart className="mr-2" size={18}/>
                        Thanks for trusting us
                    </button>
                    <Link  to={"/"}className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 rounded-lg
                   transition duration-300 flex items-center justify-center
                   Continue Shopping"> 
                   <ArrowRight className="ml-2" size={18}/>
                   Continue Shopping
                    </Link>

                   </div>

                </div>
            </div>
        </div>
    )
}

export default PurchaseSucessPage