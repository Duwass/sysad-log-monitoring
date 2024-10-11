import {Schema, model, models} from "mongoose";

const shippingAddressSchema = new Schema(
    {
        fullName: { type: String},
        street: { type: String},
        city: { type: String},
        country: { type: String}
    }
);

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        phone: { type: String},
        shippingAddress: shippingAddressSchema
    },
)



const User = models.User || model("User", UserSchema);

export default User;