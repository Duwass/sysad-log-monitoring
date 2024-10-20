import Cart from "../models/carts.model";
import { Request, Response } from 'express';

// Hiện tất cả giỏ hàng trong danh sách
export const getAllCarts = async (req: Request, res: Response) => {
    try {
        const cartList = await Cart.find({});
        res.status(200).json(cartList);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Thêm giỏ hàng mới vào danh sách giỏ hàng
export const createCart = async (req: Request, res: Response) => {
    try {
        const newCart = await Cart.create(req.body);
        res.status(200).json(newCart);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Tìm kiếm giỏ hàng theo id
export const getCartById = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

// Cập nhật giỏ hàng trong danh sách
export const updateCart = async (req: Request, res: Response) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedCart) {
            res.status(200).json(updatedCart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

// Xóa giỏ hàng khỏi danh sách
export const deleteCart = async (req: Request, res: Response) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        if (deletedCart) {
            res.status(200).json({ message: "Cart deleted successfully" });
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
