import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./configs/db.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))

// Default route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is Live" })
})

// app routes
app.use("/api/user", userRouter)


// Serve Uploads folder

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
        res.set("Access-Control-Allow-Origin", "http://localhost:5173")
    }
}))

const PORT = process.env.PORT || "3000"

// mongoDb connection
connectDB()

const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})