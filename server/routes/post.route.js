import { Router } from "express";
import { PostController } from "../controllers/post.cotroller.js";

const router = Router()

router.route('/posts')
    .post(PostController.createPost)
    .get(PostController.getAllPost)

router.route('/posts/:id')
    .get(PostController.getOnePost)
    .delete(PostController.deletePost)
    .put(PostController.updatePost)

    export default router;