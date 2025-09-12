import { Getproducts ,Getfeatureproducts,CreateProducts,DeleteProducts,
    GetrecommendedProducts,GetproductsCategory,ToggleFeatureProduct} from "../controllers/productController.js"
import { protectedRoute,AdminRoute } from "../middlewares/Auth.middleware.js"
import express from "express"

const productrouter=express.Router()

productrouter.get("/",protectedRoute,/*AdminRoute*/Getproducts)
productrouter.get("/feature",Getfeatureproducts)
productrouter.get("/category/:category",GetproductsCategory)
productrouter.get("/recommendations",protectedRoute,GetrecommendedProducts)
productrouter.post("/",protectedRoute,AdminRoute,CreateProducts)

productrouter.delete("/:id",protectedRoute,AdminRoute,DeleteProducts)
productrouter.put("/:id",protectedRoute,AdminRoute,ToggleFeatureProduct)

export default productrouter