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
 import { fileURLToPath } from "url";
dotenv.config()
console.log(process.env.PORT)

const app=express()
app.use(express.json({limit:"10mb"}))
app.use(cookieParser())
app.use(cors({
  origin:["http://localhost:5173",
          "https://buyglobal.onrender.com"

  ],
  credentials:true
}))
app.use("/api/auth",authrouter)
app.use("/api/product",productrouter)
app.use("/api/cart",cartrouter)
app.use("/api/coupons",couponrouter)
app.use("/api/payments",Paymentrouter)
app.use("/api/analytics",Analyticrouter)
app.get("/", (req, res) => {
  res.send("API is running...");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve frontend build folder
app.use(express.static(path.join(__dirname, "FrontEnd/dist")));

// ✅ Handle all non-API routes by sending React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "FrontEnd/dist", "index.html"));
});


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("serve running on port",process.env.PORT)
})