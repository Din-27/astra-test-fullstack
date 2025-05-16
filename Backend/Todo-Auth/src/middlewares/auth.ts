import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../interfaces/ErrorResponse";

export function authMiddleware(
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Access denied, Unauthorized !" });
    }

    const verified = jwt.verify(
      String(token),
      process.env.SECRET_KEY as string
    ) as { id: number };

    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Invalid token" });
  }
}
