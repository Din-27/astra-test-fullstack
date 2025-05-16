import Koa, { Context } from "koa";
import koaConnect from "koa-connect";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "koa-bodyparser";
import rateLimit from "koa-ratelimit";
import router from "./http/routes/routes";
import { requestLogger } from "./http/middleware/requestLogger";
import { handlingError } from "./http/middleware/error";

require("dotenv").config();

const app = new Koa();
const db = new Map();

app.use(
  rateLimit({
    driver: "memory",
    db: db,
    duration: 15 * 60 * 1000,
    max: 100,
    id: (ctx: Context) => ctx.ip,
  })
);

app.use(requestLogger);
app.use(handlingError);
app.use(koaConnect(morgan("dev")));
app.use(koaConnect(helmet()));
app.use(koaConnect(cors()));
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
