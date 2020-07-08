import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { SECRET_KEY } from "../controllers/authController";

const HasRole = (role?: string) => {
  return async (req: Request, res: Response, next: any) => {
    const token = req.headers?.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Token not provided please login first !",
        data: null,
      });
    }
    jwt.verify(token, SECRET_KEY, (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({
          status: "error",
          message: "Token not valid !",
          data: null,
        });
      }
      if (role) {
        if (decoded.user_role !== role) {
          return res.status(401).json({
            status: "error",
            message: "You are not authorized to be here sorry !",
            data: null,
          });
        }
      }
      req.body.role = decoded.user_role;
      req.body.token = token;

      next();
    });
  };
};

export { HasRole };
