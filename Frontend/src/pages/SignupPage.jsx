import { useState } from "react"
import { Link } from "react-router-dom"
import { UserPlus, Mail,User,ArrowRight,Lock,Loader } from "lucide-react"
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom"

// import {toast} from "react-hot-toast"
import { useUserStore } from "../../stores/useUserStore"
//  import axios from "axios"

const SignupPage=()=>{
  const {signup,loading}=useUserStore()
  const navigate=useNavigate()
    const [formData,setFormData]=useState({
        name:"",email:"",password:"",confirmPassword:""
    })
    
    const handleSubmit=(e)=>{
        e.preventDefault()

       signup(formData)
    
    
        /*axios.post("http://localhost:5000/api/auth/signup",formData)
         .then(res=>{
            console.log(res.data.user)
         }).catch(error=>{
            console.log(error.message)
            toast.error(error.message)
         })*/
    }
    return(
        <div className="flex flex-col justify-center  py-12 sm:px-6 lg:px-8">
            <motion.div  initial={{opacity:0,y:-20}} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
                         animate={{opacity:1,y:0}}
                         transition={{duration:0.8}}
            >
        <div className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Create your account</div>        
            </motion.div>


            <motion.div  initial={{opacity:0,y:20}} className="sm:mx-auto sm:w-full sm:max-w-md"
                         animate={{opacity:1,y:0}}
                         transition={{duration:0.8, delay:0.2}}
            >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                 <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Fullname
                    </label>  
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                          </div>
                          <input 
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e)=>setFormData({...formData,name:e.target.value})}
                          className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400
                          focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                          placeholder="enter your name"
                          
                          />
                          
                        
                    </div> 
                </div>

                <div>
                 <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    email
                    </label>  
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                          </div>
                          <input 
                          id="email"
                          type="text"
                          required
                          value={formData.email}
                          onChange={(e)=>setFormData({...formData,email:e.target.value})}
                          className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400
                          focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                          placeholder="email@gmail.com"
                          
                          />
                          
                        
                    </div> 
                </div>

                <div>
                 <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    password
                    </label>  
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                          </div>
                          <input 
                          id="password"
                          type="text"
                          required
                          value={formData.password}
                          onChange={(e)=>setFormData({...formData,password:e.target.value})}
                          className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400
                          focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                          placeholder="......"
                          
                          />
                          
                        
                    </div> 
                </div>

                 <div>
                 <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-300">
                    confirmPassword
                    </label>  
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                          </div>
                          <input 
                          id="confirmpassword"
                          type="text"
                          required
                          value={formData.confirmPassword}
                          onChange={(e)=>setFormData({...formData,confirmPassword:e.target.value})}
                          className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400
                          focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                          placeholder="...."
                          /> 
                    </div> 
                </div>
               <button 
               type="submit"
               className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
               text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-emerald-500
               transition duration-150 ease-in-out disabled:opacity-50 " disabled={loading}>

               {loading?(<>
               <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true"/>
               Loading..
               </>):(<>
               <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
               Signup
               </>)}

               </button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-400">
                Already have account?{" "}
                <Link to="/login" className="font-medium text-emerald-400 hover:text-emerald-300">
                Login
                <ArrowRight className="inline h-4 w-5"/>
                
                </Link>
            </p>
            </div>        
            </motion.div>
        </div>
    )
}

/*
console.log("here")
        // 
        axios.post("http://localhost:5000/api/auth/signup",formData)
         .then(res=>{
            console.log(res.data.user)
         }).catch(error=>{
            console.log(error.message)
            toast.error(error.message)
         })


*/

export default SignupPage