import User from "../models/User.model.js"
import Product from "../models/Products.models.js"
import Order from "../models/orders.model.js"

export const Getanalytics= async()=>{
    const totalusers= await User.countDocuments()
    const totalproducts=await Product.countDocuments()
    const salesData= await Order.aggregate([{$group:{
        _id:null,//it groups all document
        totalSales:{$sum:1},
        totalRevenue:{$sum:"$totalamount"}
    }
    }])
    const {totalSales,totalRevenue}=salesData[0]||{totalsales:0,totalRevenue:0}

    return {
        users:totalusers,
        Products:totalproducts,
        totalSales,
        totalRevenue
    }
}

export const getDailySalesData= async(startDate,endDate)=>{
 const dailysales= await Order.aggregate([
    {
        $match:{
            createdAt:{
                $gte:startDate,
                $lte:endDate,
            },
        },
    },{
        $group:{
            _id:{$dateToString:{format:"%Y-%m-%d",date:"$createdAt"}},
            sales:{$sum:1},
            revenue:{$sum:"$totalamount"},
        },
    },
    {$sort:{_id:1}},
 ]

 )
/*
example of daily sales data
[{
_id:"2024-08-18"
sales:455
revenue:90
}]
*/
const Datearray=getdate(startDate,endDate)
console.log(Datearray)
return Datearray.map(date=>{
    const foundDate=dailysales.find(item=>item._id===date)
    return{
        date,
        sales:foundDate?.sales||0,
        revenue:foundDate?.revenue||0
    }
})
}

function getdate(startDate,endDate){
    const dates=[];
   let currentDate=new Date(startDate)
while (currentDate<=endDate){
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate()+1)
}
return dates
}