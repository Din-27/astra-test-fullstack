import { Router } from "express";
import { getProfile, login, register } from "../controllers/auth.controller";
import { requestValidate } from "../middlewares/requestValidate";
import { AuthSchema } from "../request/auth.request";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post(
  "/login",
  requestValidate({
    type: "POST",
    schema: AuthSchema,
  }),
  login
);

router.post(
  "/register",
  requestValidate({
    type: "POST",
    schema: AuthSchema,
  }),
  register
);

router.get("/profile", authMiddleware, getProfile);

export default router;
