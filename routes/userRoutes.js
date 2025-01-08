import express from "express"
import { loginUser, registerUser, userCredit } from "../controllers/userController.js";
import userAuth from "../middleWares/auth.js";
const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/credit",userAuth ,userCredit)
export default userRouter