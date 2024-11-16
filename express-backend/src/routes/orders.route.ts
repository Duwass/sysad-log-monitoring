import express from "express";
import { getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder } from "../controllers/orders.controller";

const router = express.Router();

router.get("/order/list", getAllOrders);
router.post("/order/create", createOrder);
router.get("/oderbyid/:id", getOrderById);
router.patch("/order/update", updateOrder);
router.delete("/oder/delete", deleteOrder);

export default router;
