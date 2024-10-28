import mongoose, { model, Schema, Types } from "mongoose";

const PostSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required!"],
      minlength: [10, "Must be at least 10 characters long!"],
      maxlength: [255, "Must be less than 255 characters long!"],
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);
export default Post;
