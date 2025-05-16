import { NextFunction, Request, Response } from "express";
import Joi from "joi";

type RequestValidateOptions = {
  type: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  schema: Joi.ObjectSchema<any>;
};

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
