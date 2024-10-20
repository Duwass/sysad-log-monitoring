import express from "express";
import {createProduct, getAllProducts,getProductById,updateProduct,deleteProduct} from "../controllers/products.controller";

const router = express.Router();
router.get("/product/list", getAllProducts);
router.post("/createproduct", createProduct);
router.get("/product/id",getProductById);
router.patch("/product/update",updateProduct);
router.delete("/product/delete",deleteProduct);

export default router;