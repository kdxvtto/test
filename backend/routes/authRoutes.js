import express from "express"
import { register, login, logout } from "../controllers/auth.js"
import { validate } from "../middlewares/vaildate.js"
import { registerSchema, loginSchema } from "../validations/authValidation.js"
import { registerRateLimiter, loginRateLimiter } from "../middlewares/rateLimiter.js"
import { refreshToken } from "../controllers/refreshToken.js"
import {verifyToken} from "../middlewares/verifyToken.js"

const router = express.Router()

router.post("/register", registerRateLimiter, validate(registerSchema), register)
router.post("/login", loginRateLimiter, validate(loginSchema), login)
router.post("/logout", verifyToken, logout)
router.post("/refresh", refreshToken)
router.get("/dashboard", verifyToken, (req, res) => {
    res.json({ message: "Welcome to dashboard", user: req.user })
})

export default router
