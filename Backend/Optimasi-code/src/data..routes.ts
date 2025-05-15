import { Router } from "express";
import {
  createData,
  deleteData,
  getDatas,
  updateData,
} from "./data.controller";
const router = Router();

router.get("/", getDatas);

router.post("/", createData);

router.delete("/:id", deleteData);

router.put("/:id", updateData);

export default Router().use("/data", router);
