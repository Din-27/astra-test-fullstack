import { Router } from "express";
import { getProfile, login, register } from "../controllers/auth.controller";
import { authMiddleware, requestValidate } from "../middlewares";
import { AuthSchema } from "../request/auth.request";

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
