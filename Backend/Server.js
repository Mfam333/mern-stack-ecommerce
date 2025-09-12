import express from "express"
import dotenv from "dotenv"
import authrouter from "./routes/authRouter.js"
import productrouter from "./routes/product.route.js"
import connectDB from "./mongodb/Mongodb.js"
import cookieParser from "cookie-parser"
import cartrouter from "./routes/Cart.route.js"
import couponrouter from "./routes/Coupon.route.js"
import Paymentrouter from "./routes/Payment.route.js"
import Analyticrouter from "./routes/Analytics.route.js"

 import cors from "cors"
 import path from 'path'
dotenv.config()
console.log(process.env.PORT)

const app=express()
app.use(express.json({limit:"10mb"}))
app.use(cookieParser())
const __dirname=path.resolve()
app.use(cors({
  origin:["http://localhost:5173",
           
        

  ],
  credentials:true
}))
app.use("/api/auth",authrouter)
app.use("/api/product",productrouter)
app.use("/api/cart",cartrouter)
app.use("/api/coupons",couponrouter)
app.use("/api/payments",Paymentrouter)
app.use("/api/analytics",Analyticrouter)

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/Frontend/dist")))
  app.get("/{*splat}",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"))
  })
}



app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("serve running on port",process.env.PORT)
})