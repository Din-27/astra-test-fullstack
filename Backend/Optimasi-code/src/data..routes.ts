import { Router } from "express";
import {
  createData,
  deleteData,
  getDatas,
  updateData,
} from "./data.controller";
import { requestValidate } from "./middleware/requestValidate";
import {
  CreateTodoSchema,
  TodoByIdSchema,
  UpdateTodoSchema,
} from "./data.request";
const router = Router();

router.get("/", getDatas);

router.post(
  "/",
  requestValidate({ type: "POST", schema: CreateTodoSchema }),
  createData
);

router.delete(
  "/:id",
  requestValidate({ type: "DELETE", schema: TodoByIdSchema }),
  deleteData
);

router.put(
  "/:id",
  requestValidate({ type: "PUT", schema: UpdateTodoSchema }),
  updateData
);

export default Router().use("/data", router);
