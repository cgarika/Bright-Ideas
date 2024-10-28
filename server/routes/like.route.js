import { Router } from "express";
import LikeController from "../controllers/like.controller.js";
import authenticate from "../config/jwt.config.js";
import Like from "../models/like.model.js";

const LikeRouter = Router()

LikeRouter.post('/likes', LikeController.createLike)


export default LikeRouter;
