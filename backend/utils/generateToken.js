import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true, // Prevents XSS attacks
    sameSite: "strict", // Cross-site request protection
    secure: process.env.NODE_ENV !== "development", // HTTPS in production
  });

  return token; // Return the token
};

export default generateTokenAndSetCookies;
