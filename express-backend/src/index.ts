import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UsersRoute from "./routes/users.route";
import productsRoute from "./routes/products.route";
import PaymentRoute from "./routes/payments.route";
import OrderRoute from "./routes/orders.route";
import CartRoute from "./routes/carts.route";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/api", UsersRoute, productsRoute,PaymentRoute, OrderRoute, CartRoute);

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
