import express from "express"
import { authUser, login, logout, signUp } from "../controllers/userController.js"
import { protectedRoute } from "../middleware/protectedRoute.js"
import upload from "../middleware/uploadMiddleware.js"

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.post('/logout', protectedRoute, logout)
userRouter.get('/authMe', protectedRoute, authUser)

userRouter.post("/upload-image", protectedRoute, upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" })
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    return res.status(200).json({ success: true, message: "Image uploaded", imageUrl })
})

export default userRouter