import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { infoLogging, errorLogging } from './middlewares/logging.middleware';

import UsersRoute from "./routes/users.route";
import ProductsRoute from "./routes/products.route";
import PaymentRoute from "./routes/payments.route";
import OrderRoute from "./routes/orders.route";
import CartRoute from "./routes/carts.route"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(infoLogging);
app.use(errorLogging)

app.use("/api", UsersRoute, ProductsRoute,PaymentRoute, OrderRoute, CartRoute);

mongoose.connect(process.env.MONGODB_URI!, {
    dbName: 'SystemAd', //SystemAd
    bufferCommands: true,
})
    .then(() => {
        console.log('Connecting to MongoDB!');
        app.listen(3001, () => {
            console.log("server running on http://localhost:3001");
        });
    })
    .catch(() => console.log('Connection failed'));
