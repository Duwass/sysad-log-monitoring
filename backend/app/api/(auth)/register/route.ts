import connect from "@/lib/connect"
import User from "@/lib/models/users";
import bcrypt from 'bcryptjs';
import {NextResponse} from "next/server";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { username, email, password, phone } = body;

        // Validate inputs
        if (!username || !email || !password || !phone) {
            return new NextResponse(JSON.stringify({ message: "All fields are required" }), { status: 400 });
        }

        await connect();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new NextResponse(JSON.stringify({ message: "User with this email already exists" }), { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Store the hashed password
            phone,
        });

        await newUser.save();

        return new NextResponse(
            JSON.stringify({ message: "User registered successfully", user: newUser }),
            { status: 201 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in registering user: " + error.message,
            { status: 500 }
        );
    }
};