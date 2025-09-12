
import { useState,useEffect } from "react"
import axios from "../../lib/Axios"
import {Users,Package,ShoppingCart,DollarSign} from "lucide-react"
import CardAnalytics from "./CardAnalytics"
import { LineChart,Line,XAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer, YAxis } from "recharts"
import { motion } from "framer-motion"

const AnalyticsTab=()=>{
    const [analyticData,setAnalyticData]=useState({
        users:0,
        Products:0,
        totalSales:0,
        totalRevenue:0
    })
    const [loading,setLoading]=useState(true)
    const [dailySalesData,setDailySalesData]=useState([])

useEffect(()=>{
const fetchAnalyticsData= async()=>{
    try{
    const res= await axios.get("/analytics")
    console.log(res)
    setAnalyticData(res.data.analyticdata)
    setDailySalesData(res.data.DailySalesData)
    }catch(error){
        console.log(error)
    }
}
fetchAnalyticsData()
},[])  
console.log("daily sales data here",dailySalesData)
console.log("this is analytic data here",analyticData)

    
    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <CardAnalytics
          title="Total Users"
          value={analyticData.users.toLocaleString()}
            icon={Users}
            color="from-emerald-500 to-teal-700"/>
            <CardAnalytics
          title="Total Products"
          value={analyticData.Products.toLocaleString()}
            icon={Package}
            color="from-emerald-500 to-teal-700"/>
            <CardAnalytics
          title="Total sales"
          value={analyticData.totalSales.toLocaleString()}
            icon={ShoppingCart}
            color="from-emerald-500 to-teal-700"/>
            <CardAnalytics
          title="Total Revenue"
          value={`$${analyticData.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="from-emerald-500 to-teal-700"/>
            </div>

              <motion.div className="bg-gray-800/60 rounded-lg p-6 shadow-lg"
               initial={{opacity:0,y:20}} 
                 animate={{opacity:1,y:0}}
                 transition={{duration:0.8, delay:0.5}}>
           <ResponsiveContainer width="100%" height={400} >
            <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray={"3 3"}/>
                <YAxis yAxisId="left" stroke="#3B82F6"/>
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                <Tooltip/>
                <Legend/>
                <Line                                     
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                activeDot={{r:8}}
                name="sales"
                stroke="#8884d8"
                />
                  <Line  
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                activeDot={{r:8}}
                name="revenue"
                stroke="#82ca9d"
                />

            </LineChart>
           </ResponsiveContainer>

              </motion.div>
            

        </div>
    )
};

export default AnalyticsTab;

/*
            */




