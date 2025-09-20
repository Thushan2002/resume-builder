import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"


export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields required" })
        }
        const exisitingUsername = await User.findOne({ username })
        if (exisitingUsername) {
            return res.status(400).json({ success: false, message: "Username Already existsra" })
        }
        const exisitingEmail = await User.findOne({ email })
        if (exisitingEmail) {
            return res.status(400).json({ success: false, message: "Email Already exists" })
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validEmail = emailRegex.test(email)
        if (!validEmail) {
            return res.status(400).json({ success: false, message: "Email not valid" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })


        generateToken(newUser._id, res)
        await newUser.save()
        res.status(200).json({
            success: true, message: "User Created Successfully", user: {
                username,
                email,
            }
        })

    } catch (error) {
        console.log(`Error in Signup Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "No user found" })
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validEmail = emailRegex.test(email)
        if (!validEmail) {
            return res.status(400).json({ success: false, message: "Email not valid" })
        }

        generateToken(user._id, res)

        res.status(200).json({
            success: true, message: "Login successful", user
        })

    } catch (error) {
        console.log(`Error in Login Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const authUser = (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(404).json({ success: false, message: "No User found" })
        }
        return res.status(200).json({ success: true, user })

    } catch (error) {
        console.log(`Error in authUser Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        res.status(200).json({ success: true, message: "Logout Successful" });
    } catch (error) {
        console.log(`Error in Logout Controller: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
