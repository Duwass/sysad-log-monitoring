import Order from "../models/orders.model";
import { Request, Response } from 'express';

// Hiện tất cả đơn hàng trong danh sách
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orderList = await Order.find({});
        res.status(200).json(orderList);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Thêm đơn hàng vào danh sách đơn hàng
export const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder = await Order.create(req.body);
        res.status(200).json(newOrder);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Tìm kiếm đơn hàng theo id
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

// Cập nhật đơn hàng trong danh sách
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

// Xóa đơn hàng khỏi danh sách
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (deletedOrder) {
            res.status(200).json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
