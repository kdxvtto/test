import User from "../models/User.js"
import { generateAccessToken } from "../utils/generateToken.js"
import jwt from "jsonwebtoken"

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken){
            return res.status(401).json({message: "Token required"})
        }
        const user = await User.findOne({refreshToken})
        if(!user){
            return res.status(401).json({message: "Token invalid"})
        }
        const verifyToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const accessToken = generateAccessToken({id : verifyToken.id, username: user.username})
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })
        res.status(200).json({message: "refreshed"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}
