import { useState } from "react"
import { motion } from "framer-motion"
import { PlusCircle,Upload,Loader } from "lucide-react"
import useproductStore from "../../stores/useProductStore"
const categories=["jeans","tshirts","shoes","glasses","jackets","suits","bags"]
const CreateProductForm=()=>{

    const {createProduct,loading}=useproductStore()
    const [newproduct,setNewproduct]=useState({
        name:"",
        description:"",
        price:"",
        category:"",
        image:""
    })
    
    const HandImagechange=(e)=>{
        e.preventDefault()
        const file=e.target.files[0]
        if(file){
            const reader= new FileReader()
            reader.onloadend=()=>{
                setNewproduct({...newproduct,image:reader.result})
            }
            reader.readAsDataURL(file)
        }

    }

console.log("product form component")
    const handleSubmit=  (e)=>{
        e.preventDefault()
        createProduct(newproduct)
        
        setNewproduct({name:"",category:"",price:"",image:"",description:""})
    }  
      return(
         <motion.div className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
             
             initial={{opacity:0,y:20}} 
             animate={{opacity:1,y:0}}
           transition={{duration:0.8, delay:0.2}} 
             >
          <h2 className="text-2xl font-semibold mb-6 text-emerald-300">Create Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                 <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Product Name
                    </label>  
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          </div>
                          <input 
                          id="name"
                          type="text"
                          name="name"
                          required
                          value={newproduct.name}
                          onChange={(e)=>setNewproduct({...newproduct,name:e.target.value})}
                          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white
                          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="product name"

                          /> 
                    </div> 
                </div>
               <div>
                 <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                    Description
                    </label>  
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          </div>
                          <textarea
                          id="Description"
                          type="text"
                          name="Description"
                          required
                          value={newproduct.description}
                          onChange={(e)=>setNewproduct({...newproduct,description:e.target.value})}
                          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white
                          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="product description"
                          /> 
                    </div> 
                </div>
                <div>
                 <label htmlFor="price" className="block text-sm font-medium text-gray-300">
                    Price
                    </label>  
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          </div>
                          <input 
                          id="price"
                          type="number"
                          name="price"
                          required
                          value={newproduct.price}
                          onChange={(e)=>setNewproduct({...newproduct,price:e.target.value})}
                          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white
                          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="product price"

                          /> 
                    </div> 
                </div>
                <div>
                 <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                    Category
                    </label>  
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          </div>
                          <select
                          id="category"
                          type="text"
                          name="category"
                          required
                          value={newproduct.category}
                          onChange={(e)=>setNewproduct({...newproduct,category:e.target.value})}
                          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white
                          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="product category"
                          > 
                          <option value="">select a category</option>
                          {categories.map(cate=>(<option key={cate} value={cate}>{cate}

                          </option>))}
                         </select>
                          </div> 
                          <div className="mt-1 flex items-center">
                            <input type="file" id="image" className="sr-only" accept="image/*" onChange={HandImagechange}/>
                            <label  htmlFor="image"className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md
                            shadow-sm text-sm leading-4 font-md text-gray-300 hover:bg-gray-600 focus:out-none focus:ringe-2 focus:
                            ring-offset focus:ring-emerald-500">
                                <Upload className="h-5 w-5 inline-block mr-2 "/>
                                Upload Image
                             </label>
                            {newproduct.image&& <span className="ml-3 text-sm text-gray-400">
                                Image Uploaded
                                </span>}
                                </div>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent
                                rounded-md shadow-sm text-sm font-medium bg-emerald-600 hover:bg-emerald-700 focus:outline-none
                                focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-5" disabled={loading}>
                               {loading?(<>
                               <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true"/>
                               Loading
                               </>):(<>
                                 <PlusCircle className="mr-2 h-5 w-5"/>
                                 Create
                               </>)}
                                </button>
                </div>



                
          </form>
        
             </motion.div>
     )
}

export default CreateProductForm

/*

console.log("this is created")
        try{
       const res= await createProduct(newproduct)
        setNewproduct({name:'',description:"",price:"",category:"",image:""})
         console.log(res)
 return res

        }catch(error){
            console.log('error creating a product')
        }

*/