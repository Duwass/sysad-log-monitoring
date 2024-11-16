import express from "express";
import { getAllCarts,getCartById,updateCart,deleteCart, addItemToCart } from "../controllers/carts.controller";
const router = express.Router();

router.get("/cart/list", getAllCarts);
router.get("/cartbyid/:id", getCartById);
router.patch("/cart_update/:id", updateCart);
router.delete("/cart_delete/:id", deleteCart);
router.post("/cart/add",addItemToCart);
export default router;
