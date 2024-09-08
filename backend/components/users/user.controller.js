import bcrypt from "bcryptjs";
import UserModel from "../users/user.model.js";
import generateTokenAndSetCookies from "../../utils/generateToken.js";

export const signUpUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: "User Already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(200).json({
      message: "User created successfully",
      data: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        password: newUser.password,
      },
      success: true,
    });
  } catch (error) {
    console.log("Error in signUp Controller", error.message);
    return res.status(501).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await UserModel.findOne({ email });

    // decrypt the password

    const passwordCorrect = await bcrypt.compare(
      password,
      userExist?.password || ""
    );

    if (!userExist || !passwordCorrect) {
      return res.status(400).json({ error: "Invalid UserName or Password" });
    }

    // generate token
    const extractToken = generateTokenAndSetCookies(userExist._id, res);

   

    return res.status(200).json({
      message: "User Login Successfull",
      data: extractToken,
      success: true,
    });
  } catch (error) {
    console.log("Error in Login Controller", error.message);
    res.status(500).json({ error: "Internaal Server Error!!!" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict", // Protects against CSRF attacks
      maxAge: 0,
    });
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error in Logout Controller", error.message);
    res.stats(500).json({ error: "Internal Server Error !!" });
  }
};
