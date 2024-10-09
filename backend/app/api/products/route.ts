import connect from "@/lib/db";
import Product from "@/lib/models/products"; 
import { NextResponse } from "next/server";
import { Types } from "mongoose";
const ObjectId = require("mongodb").ObjectId;
export const GET = async () => {
    try {
        await connect();
        const products = await Product.find();
        return new NextResponse(
            JSON.stringify(products),
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);
        return new NextResponse(
            "Error in fetching products: " + error.message,
            { status: 500 }
        );
    }
};
export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        await connect();
        const newProduct = new Product(body);
        await newProduct.save();

        return new NextResponse(
            JSON.stringify({
                message: "Product created successfully",
                product: newProduct
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in creating product: " + error.message,
            { status: 500 }
        );
    }
};
export const PATCH = async (req: Request) => {
    try {
        const body = await req.json();
        const { productId, updatedData } = body;

        await connect();
        if (!productId || !updatedData) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid product ID or data" }),
                { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(productId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid product ID" }),
                { status: 400 }
            );
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: new ObjectId(productId) },
            updatedData,
            { new: true }
        );

        if (!updatedProduct) {
            return new NextResponse(
                JSON.stringify({ message: "Product not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                message: "Product updated successfully",
                product: updatedProduct
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in updating product: " + error.message,
            { status: 500 }
        );
    }
};
export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");

        if (!productId) {
            return new NextResponse(
                JSON.stringify({ message: "Product ID not provided" }),
                { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(productId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid product ID" }),
                { status: 400 }
            );
        }

        await connect();
        const deletedProduct = await Product.findByIdAndDelete(new Types.ObjectId(productId));

        if (!deletedProduct) {
            return new NextResponse(
                JSON.stringify({ message: "Product not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                message: "Product deleted successfully",
                product: deletedProduct
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in deleting product: " + error.message,
            { status: 500 }
        );
    }
};
