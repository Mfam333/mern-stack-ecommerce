import axios from "axios"
const AxiosInstance=axios.create({
//    baseURL:import.meta.mode==="development"? "http://localhost:5000/api":"/api",
    baseURL: "http://localhost:5000/api",
    withCredentials:true,//this allows us to send cookies in the request
})
export default AxiosInstance