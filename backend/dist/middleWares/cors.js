"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowCors = void 0;
const cors_1 = __importDefault(require("cors"));
exports.allowCors = (app) => {
    app.use(cors_1.default());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
};
//# sourceMappingURL=cors.js.map