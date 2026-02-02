import User from "../models/User.js"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"
import bcrypt from "bcryptjs"
import { addToBlacklist } from "../utils/blacklistToken.js"

export const register = async (req, res) => {
    try {
        const {name,username, password} = req.body
        if (!name || !username || !password) {
            return res.status(400).json({message: "Username and password are required"})
        }
        const duplicate = await User.findOne({username})
        if (duplicate) {
            return res.status(409).json({message: "Username already exists"})
        }
        const user = await User.create({name, username, password})
        const safeUser = user.toObject()
        delete safeUser.password
        res.status(201).json({message: "User created successfully", user: safeUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(400).json({message: "Username and password are required"})
        }
        const user = await User.findOne({username})
        if (!user) {
            return res.status(401).json({message: "User not found"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({message: "Password invalid"})
        }
       const payload = {
        id : user._id,
        username : user.username
       }
       const accessToken = generateAccessToken(payload)
       const refreshToken = generateRefreshToken(payload)
       user.refreshToken = refreshToken
       await user.save()

       const cookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
       }

       res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000
       })

       res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 1000
       })

       const safeUser = user.toObject()
       delete safeUser.password
       res.status(200).json({message: "Login successful", user: safeUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1] || req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken
        if(refreshToken){
            await User.findOneAndUpdate({refreshToken}, {refreshToken: null})
        }
        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        }
        res.clearCookie("refreshToken", cookieOptions)
        res.clearCookie("accessToken", cookieOptions)
        if(token){
            addToBlacklist(token)
        }
        res.status(200).json({message: "Logout successful"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}
