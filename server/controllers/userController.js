import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body

        console.log("suc", req.body);


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
        res.status(200).json({ success: true, message: "User Created Successfully", user: newUser })



    } catch (error) {
        console.log(req.body);
        console.log(`Error in Signup Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}