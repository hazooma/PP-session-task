"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authController_1 = require("../controllers/authController");
const HasRole = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]; // Bearer <token>
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Token not provided please login first !",
                data: null,
            });
        }
        jsonwebtoken_1.default.verify(token, authController_1.SECRET_KEY, (error, decoded) => {
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
    });
};
exports.HasRole = HasRole;
//# sourceMappingURL=authMiddleWare.js.map