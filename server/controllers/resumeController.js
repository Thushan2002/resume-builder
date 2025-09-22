import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import Resume from "../models/resumeModel.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// create resume
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user._id
        const defaultResumeTemplate = {
            userId: userId,
            profileInfo: {
                profillePreviewUrl: "",
                fullName: "",
                designation: "",
                summary: ""
            },
            contactInfo: {
                email: "",
                phone: "",
                location: "",
                linkedIn: "",
                gitHub: "",
                website: "",
            },
            workExperience: [{
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                description: "",
            }],
            education: [{
                degree: "",
                institution: "",
                startDate: "",
                endDate: "",
            }],
            skills: [{
                name: "",
                progress: 0,
            }],
            projects: [{
                title: "",
                description: "",
                gitHub: "",
                liveDemo: "",
            }],
            certifications: [{
                title: "",
                issuer: "",
                year: "",
            }],
            languages: [{
                name: "",
                progress: 0,
            }],
            interests: [""],
        }

        if (!title) {
            return res.status(400).json({ success: false, message: "Tiltle is Required" })
        }
        const newResume = await Resume.create({
            title,
            ...defaultResumeTemplate,
        })

        return res.status(200).json({ success: true, message: "Resume Created Successfully", newResume })
    } catch (error) {
        console.log(`Error in CreateResume Controller: ${error.message}`);
        return res.status(500).json({ success: false, error: error.message })
    }
}
export const getUserResume = async (req, res) => {
    try {
        const userId = req.user._id
        const userResumes = await Resume.find({ userId: userId }).sort({ updatedAt: -1 })
        if (userResumes.length === 0) {
            return res.status(200).json({ success: true, message: "No Resumes Available" })
        }
        return res.status(200).json({ success: true, userResumes })
    } catch (error) {
        console.log(`Error in getUserResume Controller: ${error.message}`);
        return res.status(500).json({ success: false, error: error.message })
    }
}
export const getUserResumeById = async (req, res) => {
    try {
        const { id: resumeId } = req.params
        const resume = await Resume.findById(resumeId)
        if (!resume) {
            return res.status(404).json({ success: false, message: "No Resume Available" })
        }
        return res.status(200).json({ success: true, resume })
    } catch (error) {
        console.log(`Error in getUserResumeById Controller: ${error.message}`);
        return res.status(500).json({ success: false, error: error.message })
    }
}
export const updateResume = async (req, res) => {
    try {
        const { id: resumeId } = req.params;
        const updatedData = req.body;

        const resume = await Resume.findByIdAndUpdate(
            resumeId,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!resume) {
            return res.status(404).json({ success: false, message: "No Resume Available" });
        }

        return res.status(200).json({ success: true, message: "Resume Updated", resume });
    } catch (error) {
        console.log(`Error in updateResume Controller: ${error.message}`);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const { id: resumeId } = req.params;
        const resume = await Resume.findById(resumeId)
        if (!resume) {
            return res.status(404).json({ success: false, message: "No Resume Available" });
        }
        const uploadsFolder = path.join(__dirname, "..", "uploads")
        const baseUrl = `${req.protocol}://${req.get("host")}`

        if (resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink))
            if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail)
        }

        if (resume.profileInfo.profillePreviewUrl) {
            const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profillePreviewUrl))
            if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile)
        }
        const deleted = await Resume.findByIdAndDelete(resumeId)
        if (!deleted) {
            return res.status(404).json({ success: false, message: "No Resume Available" });
        }
        return res.status(200).json({ success: true, message: "Resume deleted" });

    } catch (error) {
        console.log(`Error in deleteResume Controller: ${error.message}`);
        return res.status(500).json({ success: false, error: error.message })
    }
}