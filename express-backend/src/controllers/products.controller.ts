import Product from "../models/products.model"
import { Request, Response } from 'express';
//add - getAll - delete - update - getById
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const productList = await Product.find({});
        res.status(200).json(productList);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export const addProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(200).json(newProduct);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
