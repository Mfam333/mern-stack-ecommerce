import express from "express"
import { CheckoutSession ,CheckoutSuccess} from "../controllers/Paymentcontroller.js"
import { protectedRoute } from "../middlewares/Auth.middleware.js"
const Paymentrouter=express.Router()
Paymentrouter.post("/checkout-session",protectedRoute, CheckoutSession)
Paymentrouter.post("/checkout-success",protectedRoute, CheckoutSuccess)




export default Paymentrouter