import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId; // Use the ID from middleware
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: user,
      isAccountVerified: user.isVerified,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const setupProfile = async (req, res) => {
  try {
    const { userId, fitnessGoal, preferredTime, availability, location } =
      req.body;

    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        fitnessGoal,
        preferredTime,
        availability,
        location,
      },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile setup complete", user });
  } catch (error) {
    console.error("Profile setup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add this to your existing userController.js
export const getProfileData = async (req, res) => {
  try {
    const userId = req.userId; // From middleware
    // console.log("UserID from middleware:", req.userId);
    const user = await userModel
      .findById(userId)
      .select("-password -verifyOtp -resetOtp -__v"); // Exclude sensitive fields

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Structure the response data
    const profileData = {
      name: user.name,
      email: user.email,
      fitnessGoal: user.fitnessGoal,
      preferredTime: user.preferredTime,
      availability: user.availability,
      location: user.location,
      isVerified: user.isVerified,
    };

    res.json({ success: true, profileData });
    // console.log("Profile data received:", profileData);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
