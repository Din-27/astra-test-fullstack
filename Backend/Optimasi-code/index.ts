import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import router from "./src/data..routes";
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
