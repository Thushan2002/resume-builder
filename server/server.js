import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./configs/db.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

// Default route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is Live" })
})

const PORT = process.env.PORT || "3000"

// mongoDb connection
connectDB()

const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})