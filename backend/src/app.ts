import express from "express";
import dotenv from "dotenv";
import { allowCors } from "./middleWares/cors";
import routes from "./routes";
import bodyparser from "body-parser";
dotenv.config();
const port = process.env.PORT || 8080; // default port to listen

const app = express();

allowCors(app);
app.use(bodyparser.json());
app.use(routes);

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`server started at http://localhost:${port}`);
});

export default app;
