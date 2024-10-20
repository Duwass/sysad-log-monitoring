import Payment from "../models/payments.model";
import { Request, Response } from 'express';

// Lấy danh sách tất cả các thanh toán
export const getAllPayments = async (req: Request, res: Response) => {
    try {
        const paymentList = await Payment.find({});
        res.status(200).json(paymentList);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Tạo thanh toán mới
export const addPayment = async (req: Request, res: Response) => {
    try {
        const newPayment = await Payment.create(req.body);
        res.status(200).json(newPayment);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Lấy thông tin thanh toán theo ID
export const getPaymentById = async (req: Request, res: Response) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ message: "Payment not found" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Cập nhật thông tin thanh toán theo ID
export const updatePayment = async (req: Request, res: Response) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedPayment) {
            res.status(200).json(updatedPayment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Xóa thanh toán theo ID
export const deletePayment = async (req: Request, res: Response) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (deletedPayment) {
            res.status(200).json({ message: 'Payment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
