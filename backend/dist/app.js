"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = require("./middleWares/cors");
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const port = process.env.PORT || 8080; // default port to listen
const app = express_1.default();
cors_1.allowCors(app);
app.use(body_parser_1.default.json());
app.use(routes_1.default);
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map