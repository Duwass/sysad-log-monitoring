import Cart from "../models/carts.model";
import { Request, Response } from 'express';
import Product from "../models/products.model";

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
//Thêm item của product vào cart
export const addItemToCart = async (req: Request, res: Response): Promise<any> => {
    try {
        const { customerId, productCode, quantity } = req.body;

        // Tìm sản phẩm để lấy `productName` và `price`
        const product = await Product.findOne({ productCode });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { price, productName } = product;

        // Tìm giỏ hàng theo `customerId`
        let cart = await Cart.findOne({ customerId });

        if (!cart) {
            // Tạo mới giỏ hàng nếu chưa có
            cart = new Cart({
                customerId,
                items: [{ productName, productCode, quantity, price }],
                totalAmount: price * quantity
            });
        } else {
            // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
            const existingItemIndex = cart.items.findIndex((item: { productCode: string }) => item.productCode === productCode);

            if (existingItemIndex > -1) {
                // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // Thêm sản phẩm mới nếu chưa có trong giỏ
                cart.items.push({ productName, productCode, quantity, price });
            }

            // Cập nhật tổng số tiền
            cart.totalAmount += price * quantity;
        }

        // Lưu giỏ hàng
        await cart.save();

        return res.status(200).json(cart);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
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
