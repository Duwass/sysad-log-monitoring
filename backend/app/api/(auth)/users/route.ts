import connect from "@/lib/connect"
import User from "@/lib/models/users";
import {NextResponse} from "next/server";
import {Types} from "mongoose";
const ObjectId = require("mongodb").ObjectId;

//Get all users information
export const GET = async () => {
    try {
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users),
            {status:200});
    } catch (error: any) {
        console.log(error);
        return new NextResponse(
            "Error in fetching users" + error.message,
            {status:500});
    }

};

//create a user with full info
export const POST = async (req: Request) => {
    try{
        const body = await req.json();
        await connect();
        const newUser = new User(body);
        await newUser.save();

        return new NextResponse(
            JSON.stringify({message: "User is created", user: newUser}
            ), {status:200});

    } catch (error: any){
        return new NextResponse(
            "Error in creating user" + error.message,
            {status: 500});
    }
}
//update username by ID
export const PATCH = async(req: Request) => {
    try {
        const body = await req.json();
        const {userId, newUsername} = body;

        await connect();
        if (!userId || !newUsername) {
            return new NextResponse(
                JSON.stringify({message: "Invalid new username or ID"}),
                {status:400});
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({message: "Invalid user ID"}),
                {status:400});
        }
        const updatedUser = await User.findOneAndUpdate(
            {_id: new ObjectId(userId)},
            {username: newUsername},
            {new: true}
        )

        if (!updatedUser) {
            return new NextResponse(
                JSON.stringify({message: "User not found in the database"}),
                {status:400}
            )
        }

        return new NextResponse(
            JSON.stringify({message: "User updated", user: updatedUser}),
            {status:200}
        )
    } catch (error: any){
        return new NextResponse("Error in update user" + error.message,
            {status:500});
    }
}

//delete user by id
export const DELETE = async(req: Request) => {
    try {
        const {searchParams} = new URL(req.url);
        const userId = searchParams.get("userId");
        if (!userId) {
            return new NextResponse(
                JSON.stringify({message: "ID not found"}),
                {status:400});
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({message: "Invalid user ID"}),
                {status:400}
            )
        }
        await connect();

        const deletedUser = await User.findByIdAndDelete(
            new Types.ObjectId(userId),
        );

        if(!deletedUser) {
            return new NextResponse(
                JSON.stringify({message: "User not found in the database"}),
                {status: 400}
            )
        }
        return new NextResponse(
            JSON.stringify({message: "User deleted successfully.", user: deletedUser}),
            {status:200}
        )
    } catch (error: any) {
        return new NextResponse("Error in deleting user" + error.message,
            {status:500});
    }
}

