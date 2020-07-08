import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { USERS } from "../model/User";
export const SECRET_KEY = "wryencfpdsefwegsge";

const login = (req: Request, res: Response) => {
  const { userName, userPass } = req.body;
  const loginedUser = USERS.find(
    (user) => user.userName === userName && user.pass === userPass,
  );
  if (!loginedUser) {
    return res.status(403).json({
      status: "Fail",
      message: "No User Found ! in the system",
      data: null,
    });
  }
  jwt.sign(
    { user_role: loginedUser.role },
    SECRET_KEY,
    (error: any, token: string) => {
      return res.status(200).json({
        status: "success",
        message: "user found !",
        data: { user: loginedUser.userName, token, role: loginedUser.role },
      });
    },
  );
};

export { login };
