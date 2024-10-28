import { Router } from "express";
import PostController from "../controllers/post.cotroller.js"; // Fixed typo
import authenticate from "../config/jwt.config.js";

const PostRouter = Router();

// Routes for posts
PostRouter
  .route("/posts")
  .post(authenticate, PostController.createPost) // Protected: Create post
  .get(PostController.getAllPosts); // Public: Get all posts

  PostRouter
  .route("/posts/:id")
  .get(  PostController.getPostWithLikes) // Public: Get a single post
  .delete(authenticate, PostController.deletePost) // Protected: Delete post
  .put(authenticate, PostController.updatePost); // Protected: Update post


export default PostRouter;
