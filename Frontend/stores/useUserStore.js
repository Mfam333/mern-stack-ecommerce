import {create} from "zustand"
import axios from "../lib/Axios"
import toast from "react-hot-toast"
export const useUserStore= create((set,get)=>({
    user:null,
    loading:false,
    checkAuth:true,

 signup:async ({name,email ,password,confirmpassword})=>{
   set({loading:true});
   console.log("signup")
  
   try{
     const res= await axios.post("/auth/signup",{name,email,password})
     set({user:res.data,loading:false})
     console.log(res)
     console.log(res.data.user)
     console.log('signup')
   }catch(error){
    console.log(error.message)
    set({loading:false})
    toast.error(error.response.data.message|| "an error occurred")

   }
   
 },


login:async ({email ,password})=>{
   set({loading:true});
   console.log("signup")
  
   try{
     const res= await axios.post("/auth/login",{email,password})
     set({user:res.data,loading:false})
     console.log(res.data)
     console.log('login')
   }catch(error){
    console.log(error.message)
    set({loading:false})
    toast.error(error.response.data.message|| "an error occurred")

   }
   
 },

 logout:async()=>{

  try{
    await axios.post("/auth/logout");
    set({user:null});
  }catch(error){
 toast.error(error.response?.data?.message||"an error occurred during logout")

  }
 },

checkingAuth:async ()=>{
  set({checkAuth:true})
  try{
const respomse= await axios.get("/auth/profile")
set({user:respomse.data,checkAuth:false})
  }catch(error){
    set({user:null,checkAuth:false})
    throw error;


  }

},

refreshToken:async()=>{
  if(get().checkAuth)return
  set({checkAuth:true})
  try{
     const res= await axios.post("/auth/refreshtoken");
     set({checkAuth:false});
     return res.data


  }catch(error){
    set({user:nul,checkAuth:false})
   
  }
}


}))

const refreshPromise=null
axios.interceptors.response.use((response)=>
  response,
 async (error)=>{
   const OriginalRequest=error.config;
   if(error.response?.status===401&&OriginalRequest._retry){
    OriginalRequest._retry=true
    try{
      //if a refresh is already in process wait for it to complete
     if(refreshPromise){
      await refreshPromise;
    return axios(OriginalRequest)}
    //start a new request process
     refreshPromise=useUserStore.getState().refreshToken()
      await refreshPromise;
      refreshPromise=null
      return axios(OriginalRequest)

    }catch(refresherror){
      // if refresh fail redirect to login
      useUserStore.getState().logout()
      return Promise.reject(refresherror)
     
    }

   }
 return  Promise.reject(error)
}
)