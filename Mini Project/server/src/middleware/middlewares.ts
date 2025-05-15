import { Context, Next } from "koa";

export function notFound(ctx: Context, next: Next) {
  ctx.status = 404;
  const error = new Error(`🔍 - Not Found - ${ctx.request.originalUrl}`);
  ctx.message = String(error);
  next();
}
