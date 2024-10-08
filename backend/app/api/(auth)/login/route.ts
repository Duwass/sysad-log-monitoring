import connect from "@/lib/db"
import User from "@/lib/models/users";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {NextResponse} from "next/server";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Validate email and password
        if (!email || !password) {
            return new NextResponse(JSON.stringify({ message: "Email and password are required" }), { status: 400 });
        }

        await connect();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "Invalid email" }), { status: 400 });
        }

        // Compare provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        //const isPasswordValid = (password === user.password);
        console.log(isPasswordValid);
        console.log(password + " " + user.password);
        if (!isPasswordValid) {
            return new NextResponse(JSON.stringify({ message: "Invalid password" }), { status: 400 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET as string, // Ensure JWT_SECRET is in your .env
            { expiresIn: "1h" }
        );

        return new NextResponse(
            JSON.stringify({ message: "Login successful", token }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            "Error during login: " + error.message,
            { status: 500 }
        );
    }
};


