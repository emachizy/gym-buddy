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
userRouter.get("/test", (req, res) => {
  res.json({ success: true, message: "Test route works!" });
});

export default userRouter;
