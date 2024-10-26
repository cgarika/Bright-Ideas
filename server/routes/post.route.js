import { Router } from "express";
import PostController from "../controllers/post.cotroller.js"; // Fixed typo
import authenticate from "../config/jwt.config.js"; // Default import of the middleware

const router = Router();

// Routes for posts
router
  .route("/")
  .post(authenticate, PostController.createPost) // Protected: Create post
  .get(PostController.getAllPosts); // Public: Get all posts

router
  .route("/:id")
  .get(PostController.getOnePost) // Public: Get a single post
  .delete(authenticate, PostController.deletePost) // Protected: Delete post
  .put(authenticate, PostController.updatePost); // Protected: Update post

export default router;
