import axios from "axios"
import userModel from "../models/userModel.js"
import FormData from "form-data"


const generateImage = async (req, res) => {
    try {
        const {userId, prompt} = req.body
const user = await userModel.findById(userId)
if(!user || !prompt){ return res.json({success: false, message: "Missing Detials"}) }

    if(user.creditBalance <= 0 || userModel.creditBalance < 0){
       return res.json({success: false, message: "No credit Balance", creditBalance : user.creditBalance}) 
    }
const formData = new FormData
formData.append("prompt", prompt)
const {data }= await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {headers: {
    'x-api-key': process.env.CLIPDROP_API,
  },
responseType: "arraybuffer"
})
const base64Image = Buffer.from(data, "binary").toString("base64")
const resultIamge= `data:image/png;base64,${base64Image}`
await userModel.findByIdAndUpdate(user._id, {creditBalance : user.creditBalance - 1}, {new: true})
res.json({success: true,userId: user._id ,message: "Image generated", creditBalance: user.creditBalance - 1, resultIamge})

    } catch (error) {
        console.log(error)
      
        return res.status(500).json({ success: false, message: "An unexpected error occurred." });
    }
}
export default generateImage