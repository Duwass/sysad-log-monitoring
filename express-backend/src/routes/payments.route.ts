import express from 'express';
import { getAllPayments, addPayment, getPaymentById, updatePayment, deletePayment } from '../controllers/payments.controller';
const router = express.Router();
router.get('/payment/list', getAllPayments);
router.post('/payment/add', addPayment);
router.get('/paymentbyid/:id', getPaymentById);
router.put('/payment/update', updatePayment);
router.delete('/payment/delete', deletePayment);
export default router;
