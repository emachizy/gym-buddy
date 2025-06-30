import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenDecoded.id;

    // Optional: log for debugging
    // console.log("Authenticated user ID:", req.userId);

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default userAuth;
