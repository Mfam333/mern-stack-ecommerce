import express from "express"
import {protectedRoute} from "../middlewares/Auth.middleware.js"
import { Getanalytic } from "../controllers/AnalyticsController.js"
const Analyticrouter=express.Router()
Analyticrouter.get("/",protectedRoute,Getanalytic )


export default Analyticrouter