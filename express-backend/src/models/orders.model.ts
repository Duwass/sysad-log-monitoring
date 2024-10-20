import { Schema, model, models } from "mongoose";
const orderItemSchema = new Schema(
    {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    },
    { _id: false }
);


const shippingAddressSchema = new Schema(
    {
        fullName: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    { _id: false }
);

const OrderSchema = new Schema(
    {
        orderId: { type: String, required: true, unique: true },
        customerId: { type: String, required: true },
        items: [orderItemSchema],
        totalAmount: { type: Number, required: true },
        status: { type: String, required: true },
        shippingAddress: { type: shippingAddressSchema, required: true },
        createdAt: { type: Date, default: Date.now }
    }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
