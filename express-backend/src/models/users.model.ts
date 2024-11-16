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
        shippingAddress: shippingAddressSchema,
    },
)
UserSchema.virtual('customerId').get(function () {
    return this._id.toHexString();
});

// Đảm bảo `customerId` được bao gồm khi chuyển đổi sang JSON
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;  // Xóa `_id` khỏi kết quả JSON nếu chỉ muốn `customerId`
    }
});


const User = models.User || model("User", UserSchema);

export default User;