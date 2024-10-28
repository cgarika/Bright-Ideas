import mongoose from "mongoose"
import UserModel from "../models/user.model.js"
import Post from "../models/post.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const UserController = {
  register: async (req, res) => {
    try {
      const newUser = await UserModel.create(req.body);
      const userToken = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
  
      return res
        .cookie("userToken", userToken, { httpOnly: true })
        .status(201)
        .json({
          msg: "Registration successful!",
          user: {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
          },
          token: userToken,
        });
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
  
      const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrectPassword) {
        return res.status(400).json({ errors: { message: "Invalid password" } });
      }
  
      const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      return res
        .cookie("userToken", userToken, { httpOnly: true })
        .json({
          msg: "Login successful!",
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          token: userToken,
        });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  
  logout: async (req, res) => {
    res.clearCookie("userToken");
    return res.status(200).json({ msg: "Logout successful!" });
  },


  getUserById : async (req, res) => {
    try{
      const { id } = req.params
      const USER = await UserModel.findById(id)
      if (!USER) {
        return res.status(404).json({ msg: 'User not found!' })
      }
      const postCount = await Post.countDocuments({ user : id })
      console.log(postCount) // counts the documents that contain the specified user id associated to it
      const likeCountResult = await Post.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(id) } },
        { $project: { likeCount: { $size: "$likes" } } }, //create new field called like count and assign it to the calculation of the number of elements in the likes array for each post, the likecount field only exists for the duration of the aggregation pipeline.
        { $group: {_id: null, totalLikes: { $sum: "$likeCount"} } } // uses likeCount from the previous stage and calculates the total likes across all matched posts(posts are matched by the specified user id) $sum: "$likeCount" adds up the likeCount values from each document resulting in single value, totalLikes. 
      ])
      
      const likeCount = likeCountResult[0]?.totalLikes || 0; // extracts the totalLikes from the aggregation result, if likeCountResult is empty it defaults to 0

      return res.status(200).json({
        USER, 
        postCount,
        likeCount
      });
    } catch (err) {
      console.error(err)
      return res.status(500).json(err)
    }
  },
};

export default UserController;
