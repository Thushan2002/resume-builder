import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    thumbnailLink: {
        type: String,
    },
    template: {
        theme: String,
        colorPalette: [String]
    },
    profileInfo: {
        profillePreviewUrl: String,
        fullName: String,
        designation: String,
        summary: String
    },
    contactInfo: {
        email: String,
        phone: String,
        location: String,
        linkedIn: String,
        gitHub: String,
        website: String,
    },
    workExperience: [{
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
    }],
    education: [{
        degree: String,
        institution: String,
        startDate: String,
        endDate: String,
    }],
    skills: [{
        name: String,
        progress: Number,
    }],
    projects: [{
        title: String,
        description: String,
        gitHub: String,
        liveDemo: String,
    }],
    certifications: [{
        title: String,
        issuer: String,
        year: String,
    }],
    languages: [{
        name: String,
        progress: Number,
    }],
    interests: [String],
}, { timestamps: true })

const Resume = mongoose.model("Resume", resumeSchema)

export default Resume;