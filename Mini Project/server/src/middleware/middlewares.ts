import { Context, Next } from "koa";
import Joi from "joi";

type RequestValidateOptions = {
  type: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  schema: Joi.ObjectSchema<any> | Joi.ArraySchema<any>;
};

export function notFound(ctx: Context, next: Next) {
  ctx.status = 404;
  const error = new Error(`🔍 - Not Found - ${ctx.request.originalUrl}`);
  ctx.message = String(error);
  next();
}

export const requestValidate = (options: RequestValidateOptions) => {
  return async (ctx: Context, next: Next) => {
    const data =
      options.type === "GET"
        ? ctx.params
        : options.type === "POST"
        ? ctx.request.body
        : { ...(ctx.request.body ?? {}), ...ctx.params };

    const { error } = options.schema.validate(data);

    if (error) {
      ctx.status = 400;
      ctx.message = error.details[0].message;
      return;
    }

    await next();
  };
};
