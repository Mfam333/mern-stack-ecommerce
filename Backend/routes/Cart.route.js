import express from "express"
import { Addtocart,RemoveAll,UpdateQuantity,getCartItem } from "../controllers/Cartcontroller.js"
import { protectedRoute } from "../middlewares/Auth.middleware.js"

const cartrouter=express.Router()

cartrouter.post("/",protectedRoute,Addtocart)
cartrouter.get("/",protectedRoute,getCartItem)
cartrouter.delete("/",protectedRoute,RemoveAll)
cartrouter.put("/:id",protectedRoute,UpdateQuantity)

export default cartrouter