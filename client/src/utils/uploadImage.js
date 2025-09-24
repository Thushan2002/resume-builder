import { useAppContext } from "../context/AppContext"


const { axios } = useAppContext()
export const uploadImage = async (imageFile) => {
    const formData = new FormData()
    formData.append("image", imageFile)
    try {
        const response = await axios.post("/api/user/upload-image", formData, {
            Headers: {
                'content-type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("Error in uploading Image:", error.message);
        throw error
    }
}