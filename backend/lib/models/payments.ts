import { Schema, model, models } from "mongoose";

// Định nghĩa schema cho `payment`
const PaymentSchema = new Schema(
    {
        paymentId: { type: String, required: true, unique: true },
        customerId: { type: String, required: true },
        orderId: { type: String, required: true },
        amount: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        paymentDate: { type: Date, default: Date.now },
        status: { type: String, required: true }
    },
    { timestamps: true }
);

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
