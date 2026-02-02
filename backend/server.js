import dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./app.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, ".env") })

const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI || "mongodb://localhost:27017/auth")
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
