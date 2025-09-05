import express from "express"
import { Signupuser,Loginuser,Logoutuser ,RefreshToken,Getprofile} from "../controllers/Controller.js"
import { protectedRoute } from "../middlewares/Auth.middleware.js"

let authrouter=express.Router()

authrouter.post("/signup",Signupuser)
authrouter.post("/login",Loginuser)
authrouter.post("/logout",Logoutuser)
authrouter.post("/refreshtoken",RefreshToken)
authrouter.get("/profile",protectedRoute,Getprofile)






export default authrouter
