import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import routes from "./http/routes";
import { rateLimit } from "express-rate-limit";
import { requestLogger } from "./http/middlewares/requetsLogger";

require("dotenv").config();

const app = express();

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);
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
