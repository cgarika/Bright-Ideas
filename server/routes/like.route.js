import { Router } from "express";
import { LikeController } from "../controllers/like.controller.js";

const router = Router()

router.route('/likes')
    .post(LikeController.createLike)


    export default router;