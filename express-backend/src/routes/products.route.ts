import express from "express";
import {addProduct, getAllProducts} from "../controllers/products.controller";

const router = express.Router();
router.get("/product/list", getAllProducts);
router.post("/addproduct", addProduct);


export default router;