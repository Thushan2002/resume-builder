import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import upload from "../middleware/uploadMiddleware.js"
import Resume from "../models/resumeModel.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadResumeImages = (req, res) => {
    try {
        upload.fields([{ name: "thumbnail" }, { name: "profileImage" }]), (req, res, async (err) => {
            if (err) {
                return res.status(400).json({ success: false, error: err.message })
            }
            const { resumeId } = req.params
            const resume = await Resume.findOne({ id: resumeId })
            if (!resume) {
                return res.status(404).json({ success: false, message: "No Resume Available" })
            }

            const uploadsFolder = path.join(__dirname, "..", "uploads")
            const baseUrl = `${req.protocol}://${req.get("host")}`

            const newThumbnail = req.files.thumbnail?.[0]
            const newProfile = req.files.profileImage?.[0]

            // if new thumbnail uploaded delete older one
            if (newThumbnail) {
                if (resume.thumbnailLink) {
                    const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink))
                    if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail)
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`
            }

            // if new profile uploaded delete older one
            if (newProfile) {
                if (resume.profileInfo.profillePreviewUrl) {
                    const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profillePreviewUrl))
                    if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile)
                }
                resume.profileInfo.profillePreviewUrl = `${baseUrl}/uploads/${newProfile.filename}`
            }
            await resume.save()
            return res.status(200).json({ success: true, message: "Image Uploaded Successfully", resume });
        })
    } catch (error) {
        console.log(`Error in updateResumeImage Controller: ${error.message}`);
        return res.status(500).json({ success: false, error: error.message });
    }
}