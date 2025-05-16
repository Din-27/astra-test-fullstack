import { Router } from "express";
import todosRouter from "./todos.routes";
import authRouter from "./auth.routes";
const router = Router();

router.use("/todos", todosRouter);
router.use("/auth", authRouter);

export default router;
