import express from "express"
import { loginUser,registerUser, listUsers, deleteUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/list", listUsers) // new route to get all users
userRouter.delete("/delete/:id", deleteUser)


export default userRouter;
