import express from "express";
import { Getcoupon,Validatecoupon } from "../controllers/Couponcontroller.js";
import { protectedRoute} from "../middlewares/Auth.middleware.js"

const couponrouter=express.Router()
couponrouter.get("/",protectedRoute,Getcoupon)
couponrouter.post("/validate",protectedRoute,Validatecoupon)


export default couponrouter