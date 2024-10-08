import connect from "@/lib/db";
import Cart from "@/lib/models/carts";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
const ObjectId = require("mongodb").ObjectId;
export const GET = async () => {
    try {
        await connect();
        const carts = await Cart.find();
        return new NextResponse(
            JSON.stringify(carts),
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);
        return new NextResponse(
            "Error in fetching carts: " + error.message,
            { status: 500 }
        );
    }
};
export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        await connect();
        const newCart = new Cart(body);
        await newCart.save();

        return new NextResponse(
            JSON.stringify({
                message: "Cart created successfully",
                cart: newCart
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in creating cart: " + error.message,
            { status: 500 }
        );
    }
};
export const PATCH = async (req: Request) => {
    try {
        const body = await req.json();
        const { cartId, updatedItems } = body;

        await connect();
        if (!cartId || !updatedItems) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid cart ID or items" }),
                { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(cartId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid cart ID" }),
                { status: 400 }
            );
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { _id: new ObjectId(cartId) },
            { items: updatedItems },
            { new: true }
        );

        if (!updatedCart) {
            return new NextResponse(
                JSON.stringify({ message: "Cart not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                message: "Cart updated successfully",
                cart: updatedCart
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in updating cart: " + error.message,
            { status: 500 }
        );
    }
};
export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const cartId = searchParams.get("cartId");

        if (!cartId) {
            return new NextResponse(
                JSON.stringify({ message: "Cart ID not provided" }),
                { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(cartId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid cart ID" }),
                { status: 400 }
            );
        }

        await connect();
        const deletedCart = await Cart.findByIdAndDelete(new Types.ObjectId(cartId));

        if (!deletedCart) {
            return new NextResponse(
                JSON.stringify({ message: "Cart not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                message: "Cart deleted successfully",
                cart: deletedCart
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in deleting cart: " + error.message,
            { status: 500 }
        );
    }
};
