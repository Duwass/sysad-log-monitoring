import connect from "@/lib/db";
import Order from "@/lib/models/orders";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
const ObjectId = require("mongodb").ObjectId;
export const GET = async () => {
    try {
        await connect();
        const orders = await Order.find();
        return new NextResponse(
            JSON.stringify(orders),
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);
        return new NextResponse(
            "Error in fetching orders: " + error.message,
            { status: 500 }
        );
    }
};
export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        await connect();
        const newOrder = new Order(body);
        await newOrder.save();

        return new NextResponse(
            JSON.stringify({
                message: "Order created successfully",
                order: newOrder
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in creating order: " + error.message,
            { status: 500 }
        );
    }
};
export const PATCH = async (req: Request) => {
    try {
        const body = await req.json();
        const { orderId, updatedData } = body;

        await connect();
        if (!orderId || !updatedData) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid order ID or data" }),
                { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(orderId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid order ID" }),
                { status: 400 }
            );
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: new ObjectId(orderId) },
            updatedData,
            { new: true }
        );

        if (!updatedOrder) {
            return new NextResponse(
                JSON.stringify({ message: "Order not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                message: "Order updated successfully",
                order: updatedOrder
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in updating order: " + error.message,
            { status: 500 }
        );
    }
};
export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get("orderId");

        if (!orderId) {
            return new NextResponse(
                JSON.stringify({ message: "Order ID not provided" }),
                { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(orderId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid order ID" }),
                { status: 400 }
            );
        }

        await connect();
        const deletedOrder = await Order.findByIdAndDelete(new Types.ObjectId(orderId));

        if (!deletedOrder) {
            return new NextResponse(
                JSON.stringify({ message: "Order not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                message: "Order deleted successfully",
                order: deletedOrder
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in deleting order: " + error.message,
            { status: 500 }
        );
    }
};
