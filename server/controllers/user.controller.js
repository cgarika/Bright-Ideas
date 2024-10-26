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
        .json({ msg: "Login successful!", token: userToken });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  logout: async (req, res) => {
    res.clearCookie("userToken");
    return res.status(200).json({ msg: "Logout successful!" });
  },
  getUserByID : async (req, res) => {
    const { id } = req.params
    try{
      const USER = await UserModel.findById( id )
      if (!USER) {
        return res.status(404).json({ msg: 'User not found!' })
      }
      const postCount = await Post.countDocuments({ user : id})
      return res.status(200).json({
        USER, 
        postCount
      });
    } catch (err) {
      return res.status(500).json(err)
    }   
  }
};
export default UserController;
