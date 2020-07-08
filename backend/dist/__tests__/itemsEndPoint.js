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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("Items Endpoint GET /items", () => {
    it("un-Authenticated users can't get items", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default).get("/items");
        expect(res.statusCode).toEqual(401);
        expect(res.body.status).toEqual("error");
        expect(res.body.data).toEqual(null);
    }));
    it("Autenticated users Fetch Items successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default)
            .get("/items")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JvbGUiOiJBZG1pbiIsImlhdCI6MTU5NDA0MjY4M30.9Q0oN59o-J-REjgiIgdNxj82RHXaRTCweSWIgjOjjd8");
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toBe(null);
    }));
});
//# sourceMappingURL=itemsEndPoint.js.map