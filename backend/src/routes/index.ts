import { Router, Request, Response } from "express";
import * as authController from "../controllers/authController";
import * as itemController from "../controllers/itemController";
import { HasRole } from "../middleWares/authMiddleWare";

const router = Router();

router.post("/login", authController.login);

router.get("/items", HasRole(), itemController.showItems);

router.patch("/item/:id", HasRole("Admin"), itemController.updateItem);

// routes
export default router;
