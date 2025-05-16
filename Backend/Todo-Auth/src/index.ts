import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import { requestLogger } from "./middlewares/requetsLogger";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(requestLogger);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
