import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRoute from "./routes/users.route";
import productsRoute from "./routes/products.route";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/api", usersRoute, productsRoute);

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
