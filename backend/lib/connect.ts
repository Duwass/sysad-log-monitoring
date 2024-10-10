import * as mongoose from "mongoose";
import express from "express";
import cors from "cors";
const MONGODB_URI = process.env.MONGODB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;
const BACKEND_URL = process.env.BACKEND_URL;

const app = express();
app.use(express.json());

const corsOptions = {
    origin: FRONTEND_URL || BACKEND_URL, // Allow requests from frontend
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // Allow cookies to be sent
};
app.use(cors(corsOptions));

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1) {
        console.log("Connected to DB");
        return;
    }

    if(connectionState === 2) {
        console.log("Connecting...");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI!, {
            dbName: 'SystemAd',
            bufferCommands: true
        })
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("server running on http://localhost:3000");
        });
    } catch (e) {
        console.log("Error: " + e);
        throw new Error("Error: " + e);
    }
}

export default connect;