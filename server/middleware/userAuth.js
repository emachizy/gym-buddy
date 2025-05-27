import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  // Try to get token from cookies or Authorization header
  let token = req.cookies?.token;

  if (!token && req.headers.authorization) {
    // Format: "Bearer <token>"
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecoded) {
      req.userId = tokenDecoded.id;
      next();
    } else {
      return res.status(401).json({ success: false, message: "Access denied" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
