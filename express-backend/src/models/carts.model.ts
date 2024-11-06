import { Schema, model, models } from "mongoose";
import Product from "./products.model";
import User from "./users.model";

const cartItemSchema = new Schema(
    {
        productCode: { type: String, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    },
    { _id: false }
);
const CartSchema = new Schema(
    {
        customerId: { type: String, required: true ,ref:"User"},
        items: [cartItemSchema],
        totalAmount: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now }
    }
);
const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
