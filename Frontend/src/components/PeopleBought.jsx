import { useState } from "react"
import ProductCart from "./ProductCart"
import { useEffect } from "react"
import axios from "../../lib/Axios"
import toast from "react-hot-toast"
import LoadingSpinner from "../components/LoadingSpinner"
const PeopleBought=()=>{
    const [recommendations,setRecommendations]=useState([])
    const [isloading,setIsloading]=useState(true)
    useEffect(()=>{
const Fetchrecommendations= async()=>{
    try{
    const res=   await axios.get("/product/recommendations")
    console.log("this is the recommended product",res.data)
    setRecommendations(res.data)
    }catch(error){
     toast.error(error.response.data.message||"error occurred while fetching recommendations")
    }finally{
        setIsloading(false)
    }
}
 Fetchrecommendations() },[])
  console.log(recommendations)
 if(isloading){
    return <LoadingSpinner/>
 }
    return(<div className="mt-8">
        <h3 className="text-2xl font-semibold text-emerald-400">people also buy</h3>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
         {recommendations?.map(product=>(<ProductCart key={product._id} product={product}/>))} 

        </div>

    </div>)
}

export default PeopleBought