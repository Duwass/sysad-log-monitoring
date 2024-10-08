import * as mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

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
        console.log("Connected");
    } catch (e) {
        console.log("Error: " + e);
        throw new Error("Error: " + e);
    }
}

export default connect;