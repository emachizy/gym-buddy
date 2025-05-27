import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getProfileData,
  getUserData,
  setupProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.post("/setup-profile", userAuth, setupProfile);
userRouter.get("/profile", userAuth, getProfileData);

export default userRouter;
