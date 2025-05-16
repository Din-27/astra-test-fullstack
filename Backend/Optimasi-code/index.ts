import { rateLimit } from "express-rate-limit";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import router from "./src/data.routes";
import { requestLogger } from "./src/middleware/requetsLogger";
const app = express();
const port = 3000;

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);
app.use(express.json());
app.use(requestLogger);
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
