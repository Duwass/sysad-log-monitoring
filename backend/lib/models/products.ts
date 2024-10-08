import { Schema, model, models } from "mongoose";
const ProductSchema = new Schema(
    {
        productName: { type: String, required: true },
        productCode: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        description: { type: String },
        manufacturer: { type: String },
        createdAt: { type: Date, default: Date.now },
    }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
