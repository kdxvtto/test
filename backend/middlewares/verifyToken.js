import jwt from "jsonwebtoken"
import { isBlacklisted } from "../utils/blacklistToken.js"

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1] || req.cookies.accessToken
        if (!token) {
            return res.status(401).json({ message: "Token required" })
        }
        if (await isBlacklisted(token)) {
            return res.status(401).json({ message: "Token blacklisted" })
        }
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Token invalid or expired" })
    }
}
