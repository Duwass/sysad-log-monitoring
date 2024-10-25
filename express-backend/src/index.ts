import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import loggingMiddleware from "./middlewares/logging.middleware";

import UsersRoute from "./routes/users.route";
import productsRoute from "./routes/products.route";
import PaymentRoute from "./routes/payments.route";
import OrderRoute from "./routes/orders.route";
import CartRoute from "./routes/carts.route";

dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());
server.use(loggingMiddleware);

server.use("/api", UsersRoute, productsRoute,PaymentRoute, OrderRoute, CartRoute);

mongoose.connect(process.env.MONGODB_URI!, {
    dbName: 'SystemAd', //SystemAd
    bufferCommands: true,
})
    .then(() => {
        console.log('Connecting to MongoDB!');
        server.listen(3001, () => {
            console.log("server running on http://localhost:3001");
        });
    })
    .catch(() => console.log('Connection failed'));
