import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserController = {
  register: async (req, res) => {
    try {
      const newUser = await UserModel.create(req.body);

      const userToken = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

      return res
        .cookie("userToken", userToken, { httpOnly: true })
        .status(201)
        .json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).json({ errors: { message: "User not found" } });
      }

      const isCorrectPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isCorrectPassword) {
        return res.status(400).json({ errors: { message: "User not found" } });
      }

      const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

      return res
        .cookie("userToken", userToken, { httpOnly: true })
        .json({ msg: "Login successful!" });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  logout: async (req, res) => {
    res.clearCookie("userToken");
    return res.status(200).json({ msg: "Logout successful!" });
  },
};
export default UserController;
