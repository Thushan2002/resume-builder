import express from "express"
import { authUser, login, logout, signUp } from "../controllers/userController.js"
import { protectedRoute } from "../middleware/protectedRoute.js"

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.post('/logout', protectedRoute, logout)
userRouter.get('/authMe', protectedRoute, authUser)

export default userRouter