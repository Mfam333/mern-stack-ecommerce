import { Getanalytics,getDailySalesData } from "./Getanalytics.js"
export const Getanalytic=async(req,res)=>{
    try{
const analyticdata= await Getanalytics()
console.log(analyticdata)
const endDate=new Date();
const startDate=new Date(endDate.getTime()-7*24*60*60*1000);
const DailySalesData= await getDailySalesData(startDate,endDate)
 res.status(200).json({
    analyticdata,
    DailySalesData
})

    }catch(error){
        console.log("error",error.message)
        res.status(500).json({success:false,message:"server error",error:error.message})  
    }

}

