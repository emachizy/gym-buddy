import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    console.log("User Data Sent:", {
      success: true,
      userData: user,
      isAccountVerified: user.isVerified, // Log this
    });

    res.json({
      success: true,
      userData: user,
      isAccountVerified: user.isVerified,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
