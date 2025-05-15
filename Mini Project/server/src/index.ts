import Koa from "koa";
import koaConnect from "koa-connect";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "koa-bodyparser";

import * as middlewares from "./middleware/middlewares";
import router from "./routes/routes";

require("dotenv").config();

const app = new Koa();

app.use(koaConnect(morgan("dev")));
app.use(koaConnect(helmet()));
app.use(koaConnect(cors()));
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(middlewares.notFound);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
