import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import authenticate from "../config/jwt.config.js";

const UserRouter = Router();

// Define routes using UserController methods
UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);
UserRouter.post("/logout", UserController.logout);

// Add a protected route for getting all users
// UserRouter.get("/users", authenticate, UserController.getAll);

UserRouter.route("/user/:id").get(UserController.getUserByID);

// Export UserRouter as the default export
export default UserRouter;
