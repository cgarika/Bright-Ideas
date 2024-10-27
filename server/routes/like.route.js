import { Router } from "express";
import LikeController from "../controllers/like.controller.js"

const LikeRouter = Router()

LikeRouter.post("/likes", LikeController.createLike)

export default LikeRouter;