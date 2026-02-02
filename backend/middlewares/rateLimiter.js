import rateLimit from "express-rate-limit"
import rateLimitRedis from "rate-limit-redis"
import redisClient from "../config/redis.js"

const makeStore = (prefix) =>
    new rateLimitRedis({
        sendCommand: (...args) => redisClient.call(...args),
        prefix,
    })

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
    store: makeStore("rl:global:"),
})

export const loginRateLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 5,
    message: "Too many login attempts from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
    store: makeStore("rl:login:"),
})

export const registerRateLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 5,
    message: "Too many registration attempts from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
    store: makeStore("rl:register:"),
})
