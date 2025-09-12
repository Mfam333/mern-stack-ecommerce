
import { useEffect } from "react"
import useproductStore from "../../stores/useProductStore"
import Category from "../components/Category"
import Featuredproducts from "../components/Feacturedproduct"


const categories=[{href:"/jeans",name:"jeans",imageUrl:"/jeans.jpg"},
                    {href:"/bags",name:"bags",imageUrl:"/bags.jpg"},
                    { href:"/glasses",name:"glasses",imageUrl:"/glasses.png"},
                    {href:"/jackets",name:"jackets",imageUrl:"/jackets.jpg"},
                    {href:"/suits",name:"suits",imageUrl:"/suits.jpg"},
                    {href:"/tshirts",name:"tshirts",imageUrl:"/p_img12.png"},
                    { href:"/shoes",name:"shoes",imageUrl:"/shoes.jpg"},
            
                      ]

const Homepage=()=>{
    const {loading,products,fetchfeaturedProducts}=useproductStore()

    useEffect(()=>{
        fetchfeaturedProducts()

    },[])
    
    return(
        <div className="relative min-h-screen text-white overflow-hidden">
                <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
                    Eplore Our Categories
                </h1>
                <p className="text-center text-xl text-gray-300 mb-12">
                    Discover the latest trends in eco-freiendly fashion
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map(category=>(<Category category={category} key={category.name}/>))}
                </div>
                {!loading && products.length>0&&<Featuredproducts featuredproducts={products}/>}
            </div>
        
    
    )
}

export default Homepage