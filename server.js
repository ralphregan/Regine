import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoutes.js"
import imageRouter from "./routes/imageRoute.js"

const PORT = process.env.PORT || 4000
const app = express()
app.use(express.json())
app.use(cors())
await connectDB()
app.use("/api/user",userRouter)
app.use("/api/image",imageRouter)
app.get("/" , (req, res)=>{
    res.send("Working as intended :)")
})
app.listen(PORT, ()=> console.log("I am Listening on http://localhost:"+PORT) )
//http://localhost:4000/api/user/register
//http://localhost:4000/api/user/login