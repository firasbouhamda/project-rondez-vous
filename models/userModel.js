const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    role: {
        type: Number,
        default: 1 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dd0itzvoj/image/upload/v1621338619/avatar/pngtree-businessman-avatar-cartoon-style-png-image_1953664_bmdhuk.jpg"
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)