import express from "express";
import { loginUser, logoutUser, signUpUser } from "./user.controller.js";
import protectRoute from "../../middleware/protectRoute.js";

const route = express.Router();

route.post("/signup", signUpUser);
route.post("/login", loginUser);
route.post('/logout',protectRoute,logoutUser)

export default route;
