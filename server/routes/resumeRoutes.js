import express from "express"
import { protectedRoute } from "../middleware/protectedRoute.js"
import { createResume, deleteResume, getUserResume, getUserResumeById, updateResume } from "../controllers/resumeController.js"
import { uploadResumeImages } from "../controllers/uploadImageController.js"

const resumeRouter = express.Router()

resumeRouter.post("/createResume", protectedRoute, createResume)
resumeRouter.get("/getResume", protectedRoute, getUserResume)
resumeRouter.get("/getResume/:id", protectedRoute, getUserResumeById)
resumeRouter.put("/updateResume/:id", protectedRoute, updateResume)
resumeRouter.delete("/deleteResume/:id", protectedRoute, deleteResume)
resumeRouter.post("/:id/upload-images", protectedRoute, uploadResumeImages)

export default resumeRouter