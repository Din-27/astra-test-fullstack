import Router from "@koa/router";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateOrderTodo,
  updateTodo,
} from "../controllers/todo.controller";
const router = new Router({ prefix: "/api/v1/todo" });

router.get("/", getTodos);

router.get("/:id", getTodoById);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.patch("/", updateOrderTodo);

router.delete("/:id", deleteTodo);

export default router;
