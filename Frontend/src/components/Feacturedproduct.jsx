import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ShoppingBasket, ShoppingCart } from "lucide-react"
import { useCartStore } from "../../stores/useCartStore"

const Featuredproducts=({featuredproducts})=>{
    const [currentIndex,setCurrntIndex]=useState(0)
    const [itemsperpage,setItemsperpage]=useState(4)
    const {AdditemToCart}=useCartStore()

    useEffect(()=>{
        const HandleResize=()=>{
            if(window.innerWidth<640)setItemsperpage(1)
            else if(window.innerWidth<1024)setItemsperpage(2)
            else if(window.innerWidth<1280) setItemsperpage(3)
             else setItemsperpage(4)
        }
        window.addEventListener("resize",HandleResize)
        return window.removeEventListener("resize",HandleResize)
    },[])

    const nextslide=()=>{
        setCurrntIndex((prevIndex)=>prevIndex+itemsperpage)
    }
    const prevslide=()=>{
        setCurrntIndex((prevIndex)=>prevIndex-itemsperpage)
    }
    const isStartdisabled=currentIndex===0;
    const isEndDisabled=currentIndex>=featuredproducts.length-itemsperpage
    return(<div className="py-12">
        <div className="container mx-auto px-4">
            <h2 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">Featured Products</h2>
            <div className="relative">
             <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out"
              style={{transform:`translateX(-${currentIndex*(100/itemsperpage)}%)`}}>
                 {featuredproducts?.map((product)=>(<div key={product._id} 
                 className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2">
                <div  className=" backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300
                 hover:shadow-xl border border-emerald-500/30">
                   <div className="overflow-hidden">
                    <img src={product.image}
                     alt={product.name}
                     className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                     />
                   </div>
                   <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">{product.name}</h3>
                    <p className="text-emerald-300 font-medium mb-4">
                        {product.price.toFixed(2)}
                    </p>

                    <button onClick={()=>AdditemToCart(product)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 px-4 rounded
                    transition-colors duration-300 flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 mr-2"/>
                         AddToCart
                    </button>
                    </div>

                    </div>


                 </div>))}
              </div>
                </div>
                 <button onClick={prevslide}
                 disabled={isStartdisabled}
                 className={`absolute top-1/2 -left-4 trnasform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
                    isStartdisabled?"bg-gray-400 cursor-not-allowed":"bg-emerald-600 hover:bg-emerald-500"
                 }`}>
                 <ChevronLeft className="m-6 h-6"/>
                 </button>

                 <button onClick={nextslide}
                 disabled={isEndDisabled}
                 className={`absolute top-1/2 -right-4 trnasform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
                    isEndDisabled?"bg-gray-400 cursor-not-allowed":"bg-emerald-600 hover:bg-emerald-500"
                 }`}>
                 <ChevronRight className="m-6 h-6"/>
                 </button>
            </div>

        </div>

    </div>)
}

export default Featuredproducts