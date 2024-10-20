import { Schema, model, models } from "mongoose";


const cartItemSchema = new Schema(
    {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    },
    { _id: false }
);
const CartSchema = new Schema(
    {
        customerId: { type: String, required: true },
        items: [cartItemSchema],
        totalAmount: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now }
    }
);
const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
