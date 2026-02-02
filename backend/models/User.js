import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: null
    }
},{
    timestamps: true
}
)

userSchema.pre("save", async function () {
    if (this.isModified("password") || this.isNew) {
        if (!this.password || this.password.length < 6) {
            throw new Error("Password must be at least 6 characters long")
        }
        const salt = parseInt(process.env.SALT || 10)
        const hashedpassword = await bcrypt.hash(this.password, salt)
        this.password = hashedpassword
    }
})

userSchema.pre("findOneAndUpdate", async function () {
    if (this._update.password) {
        if (this._update.password.length < 6) {
            throw new Error("Password must be at least 6 characters long")
        }
        const salt = parseInt(process.env.SALT || 10)
        const hashedpassword = await bcrypt.hash(this._update.password, salt)
        this._update.password = hashedpassword
    }
})

userSchema.index({refreshToken: 1})

export default mongoose.model("User", userSchema)
