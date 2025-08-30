import jwt from "jsonwebtoken"

export const generateToken = async ({ id }, res) => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 24 * 60 * 60 * 1000,
        })

        return token

    } catch (error) {
        console.error(`Error in generating Token: ${error.message}`);
    }
}