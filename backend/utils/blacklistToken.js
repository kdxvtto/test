import jwt from "jsonwebtoken"
import redisClient from "../config/redis.js"

export const addToBlacklist = async (token) => {
    const { exp } = jwt.verify(token, process.env.JWT_SECRET)
    const ttlSeconds = Math.max(1, Math.ceil((exp * 1000 - Date.now()) / 1000))
    await redisClient.set(`blacklist:${token}`, "1", "EX", ttlSeconds)
}

export const isBlacklisted = async (token) => {
    const exists = await redisClient.exists(`blacklist:${token}`)
    return Boolean(exists)
}
