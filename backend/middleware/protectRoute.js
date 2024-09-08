import jwt from "jsonwebtoken";
import UserModel from "../components/users/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(400).json({
        error: "Unauthorized-No Token Provided",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        error: "Unauthorized-invalid Token",
      });
    }

    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error is protectRoute middleware ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
