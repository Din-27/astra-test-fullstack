import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller";
import { requestValidate } from "../middlewares/requestValidate";
import {
  CreateTodoSchema,
  DeleteTodoSchema,
  GetTodoByIdSchema,
  UpdateTodoSchema,
} from "../request/todo.request";
const router = Router();

router.get("/", getTodos);

router.get(
  "/:id",
  requestValidate({
    type: "GET",
    schema: GetTodoByIdSchema,
  }),
  getTodoById
);

router.post(
  "/",
  requestValidate({
    type: "POST",
    schema: CreateTodoSchema,
  }),
  createTodo
);

router.patch(
  "/:id",
  requestValidate({
    type: "PATCH",
    schema: UpdateTodoSchema,
  }),
  updateTodo
);

router.delete(
  "/:id",
  requestValidate({
    type: "DELETE",
    schema: DeleteTodoSchema,
  }),
  deleteTodo
);

export default router;
