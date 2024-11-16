import User from "../models/users.model"
import { Request, Response } from 'express';
//register - login - getall

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export const userRegister = async (req : Request, res : Response) => {
    try {
        const { username, email, password, phone } = req.body;
        // Validate the input
        if (!username || !email || !password || !phone) {
            res.status(400).json({ message: "Fill all the information" });
            return;
        }

        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate the input
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email" });
            return;
        }

        // Compare the entered password with the stored hashed password
        if (user.password !== password) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }

        // Return the user data (excluding password)
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};


