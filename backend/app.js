import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import { globalRateLimiter } from "./middlewares/rateLimiter.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, ".env") })

const app = express()

app.use(express.json())
app.use(cookieParser())

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    })
)
app.use(globalRateLimiter)

app.use("/api/auth", authRoutes)

export default app
