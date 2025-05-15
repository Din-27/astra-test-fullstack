import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import ErrorResponse from "../interfaces/ErrorResponse";
import Joi from "joi";

type RequestValidateOptions = {
  type: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  schema: Joi.ObjectSchema<any>;
};

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

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

export const requestValidate = (options: RequestValidateOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data =
      options.type === "GET"
        ? req.params
        : options.type === "POST"
        ? req.body
        : { ...req.body, ...req.params };

    const { error } = options.schema.validate(data);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  };
};
