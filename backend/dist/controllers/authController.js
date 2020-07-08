"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../model/User");
exports.SECRET_KEY = "wryencfpdsefwegsge";
const login = (req, res) => {
    const { userName, userPass } = req.body;
    const loginedUser = User_1.USERS.find((user) => user.userName === userName && user.pass === userPass);
    if (!loginedUser) {
        return res.status(403).json({
            status: "Fail",
            message: "No User Found ! in the system",
            data: null,
        });
    }
    jsonwebtoken_1.default.sign({ user_role: loginedUser.role }, exports.SECRET_KEY, (error, token) => {
        return res.status(200).json({
            status: "success",
            message: "user found !",
            data: { user: loginedUser.userName, token, role: loginedUser.role },
        });
    });
};
exports.login = login;
//# sourceMappingURL=authController.js.map