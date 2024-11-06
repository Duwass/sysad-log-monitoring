import express from "express";
import {createProduct, getAllProducts,getProductByCode,updateProduct,deleteProduct} from "../controllers/products.controller";

const router = express.Router();
router.get("/product/list", getAllProducts);
router.post("/createproduct", createProduct);
router.get("/product/:productCode",getProductByCode);
router.patch("/product/update",updateProduct);
router.delete("/product/delete",deleteProduct);

export default router;