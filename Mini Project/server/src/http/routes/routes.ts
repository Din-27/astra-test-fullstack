import Router from "@koa/router";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateOrderTodo,
  updateTodo,
} from "../controllers/todo.controller";
import { requestValidate } from "../middleware/requestValidate";
import {
  CreateTodoSchema,
  TodoByIdSchema,
  UpdateTodoOrderSchema,
  UpdateTodoSchema,
} from "../request/todo";
const router = new Router({ prefix: "/api/v1/todo" });

router.get("/", getTodos);

router.get(
  "/:id",
  requestValidate({ type: "GET", schema: TodoByIdSchema }),
  getTodoById
);

router.post(
  "/",
  requestValidate({ type: "POST", schema: CreateTodoSchema }),
  createTodo
);

router.patch(
  "/:id",
  requestValidate({ type: "PATCH", schema: UpdateTodoSchema }),
  updateTodo
);

router.put(
  "/",
  requestValidate({ type: "PUT", schema: UpdateTodoOrderSchema }),
  updateOrderTodo
);

router.delete(
  "/:id",
  requestValidate({ type: "DELETE", schema: TodoByIdSchema }),
  deleteTodo
);

export default router;
