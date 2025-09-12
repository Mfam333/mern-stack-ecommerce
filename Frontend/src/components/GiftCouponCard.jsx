
import {motion} from "framer-motion"
import { useEffect, useState } from "react"
 import { useCartStore } from "../../stores/useCartStore"

const GiftCouponCard=()=>{
    const [userInputCode,setUserInputCode]=useState("")
    const {coupon,isCouponApplied,RemoveCoupon,ApplyCoupon,getCouponCode}=useCartStore()

    useEffect(()=>{
        getCouponCode();

    },[getCouponCode]);
   useEffect(()=>{
    if(coupon)
        setUserInputCode(coupon.code);

   },[coupon]);
   


        

    const ApplyCouponCode=()=>{
     if(!userInputCode) return
     ApplyCoupon(userInputCode)
    }

         const RemoveCouponCode= async ()=>{
       await RemoveCoupon();
       setUserInputCode("");
        }

    return(<motion.div  className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
     initial={{opacity:0,y:20}} 
             animate={{opacity:1,y:0}}
           transition={{duration:0.8, delay:0.2}} >
            <div className="space-y-6">
                <div>
              <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-300">
                do you have a voucher or a gift card?
              </label>
               <input
               type="text"
               id="voucher"
               className="block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2.5 text-sm text-white 
               placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
               placeholder="Enter coupon here"
               value={userInputCode}
               onChange={()=>setUserInputCode(e.target.value)}
               required
               />
                </div>
               < motion.button 
               type="button"
               className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium
                text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                whileHover={{scale:1.05}}
                whileTap={{scale:0.9}}
                onClick={ApplyCouponCode}
               >
               Apply code
               </motion.button>
            </div>
            {isCouponApplied&&coupon&&(
                <div className="mt-4">
                    <h4 className="text-lg font-medium text-gray-300">
                     Applied coupon
                    </h4>
                    <p className="mt-2 text-sm text-gray-400">
                        {coupon.code}-{coupon.discountpercentage}%off
                    </p>
                    <motion.div type="button"
                    className="mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium
                    text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.9}}
                    onClick={RemoveCouponCode}
                    
                    >
                    Remove Coupon
                    </motion.div>
                </div>
            )}

            {coupon&&(
                <div className="mt-4">
                    <h4 className="text-lg font-medium text-gray-300">your available coupon:</h4>
                    <p className="mt-2 text-sm text-gray-400">
                        {coupon.code}-{coupon.discountpercentage}%off

                    </p>


                </div>
            )

            }
    </motion.div>)

}

export default GiftCouponCard