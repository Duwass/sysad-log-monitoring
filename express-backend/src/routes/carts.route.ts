import express from "express";
import { getAllCarts, createCart,getCartById,updateCart,deleteCart } from "../controllers/carts.controller";
const router = express.Router();

router.get("/cart/list", getAllCarts);
router.post("/cart/create", createCart);
router.get("/cartbyid/:id", getCartById);
router.patch("/cart/update", updateCart);
router.delete("/cart/delete", deleteCart);

export default router;
