import connect from "@/lib/db";
import Payment from "@/lib/models/payments";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
const ObjectId = require("mongodb").ObjectId;
export const GET = async () => {
    try {
        await connect();
        const payments = await Payment.find();
        return new NextResponse(
            JSON.stringify(payments),
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);
        return new NextResponse(
            "Error in fetching payments: " + error.message,
            { status: 500 }
        );
    }
};
export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        await connect();
        const newPayment = new Payment(body);
        await newPayment.save();

        return new NextResponse(
            JSON.stringify({
                message: "Payment created successfully",
                payment: newPayment
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in creating payment: " + error.message,
            { status: 500 }
        );
    }
};
export const PATCH = async (req: Request) => {
    try {
        const body = await req.json();
        const { paymentId, updatedData } = body;

        await connect();
        if (!paymentId || !updatedData) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid payment ID or data" }),
                { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(paymentId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid payment ID" }),
                { status: 400 }
            );
        }

        const updatedPayment = await Payment.findOneAndUpdate(
            { _id: new ObjectId(paymentId) },
            updatedData,
            { new: true }
        );

        if (!updatedPayment) {
            return new NextResponse(
                JSON.stringify({ message: "Payment not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                message: "Payment updated successfully",
                payment: updatedPayment
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in updating payment: " + error.message,
            { status: 500 }
        );
    }
};
export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const paymentId = searchParams.get("paymentId");

        if (!paymentId) {
            return new NextResponse(
                JSON.stringify({ message: "Payment ID not provided" }),
                { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(paymentId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid payment ID" }),
                { status: 400 }
            );
        }

        await connect();
        const deletedPayment = await Payment.findByIdAndDelete(new Types.ObjectId(paymentId));

        if (!deletedPayment) {
            return new NextResponse(
                JSON.stringify({ message: "Payment not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                message: "Payment deleted successfully",
                payment: deletedPayment
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in deleting payment: " + error.message,
            { status: 500 }
        );
    }
};
