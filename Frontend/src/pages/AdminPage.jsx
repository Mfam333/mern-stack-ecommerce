import { BarChart,PlusCircle,ShoppingBasket } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import ProductsList from "../components/ProductsList"
import AnalyticsTab from "../components/AnalyticsTab"
import CreateProductForm from "../components/CreateProductForm"
import useproductStore from "../../stores/useProductStore"
import { useEffect } from "react"
const Tabs=[{id:"create",label:"create product",icon:PlusCircle},
              {id:"products",label:" products",icon:ShoppingBasket},
              {id:"analytics",label:"analytics",icon:BarChart},


]
const AdminPage=()=>{
    const [activeTab,setActiveTab]=useState("create")
   const {fetchAllProduct}= useproductStore()
   useEffect(()=>{
    fetchAllProduct()

   },[fetchAllProduct])
    return(
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
            <div className="relative z-10 container mx-auto px-4 py-16">
             <motion.h1 className="text-4xl  font-bold mb-8 text-emerald-400 text-center"
             
             initial={{opacity:0,y:20}} 
             animate={{opacity:1,y:0}}
         transition={{duration:0.8, delay:0.2}} 
             >

            Admin DashBoard
             </motion.h1>
             <div className="flex justify-center mb-8">
                {Tabs.map(tab=>(<button key={tab.id} onClick={()=>setActiveTab(tab.id)} 
                className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                    activeTab===tab.id ?"bg-emerald-500 text-white" :"bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                 <tab.icon className="mr-2 h-5 w-5"/>  
                 {tab.label}
                </button>))}
             </div>
             {activeTab==="create" && <CreateProductForm/>}
             {activeTab==="products" && <ProductsList/>}
             {activeTab==="analytics" && <AnalyticsTab/>}
            </div>
        </div>
    )
}

export default AdminPage