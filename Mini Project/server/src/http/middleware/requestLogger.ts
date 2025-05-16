import { NextFunction, Request, Response } from "express";
import { loggerFile } from "../../libs/logger";
import chalk from "chalk";
import { Context } from "koa";

type TStatusCodeLabel = {
  label: "SUCCESS" | "WARNING" | "DANGER";
  level: string;
};

function getStatusLabel(statusCode: number): TStatusCodeLabel {
  let result: TStatusCodeLabel = {
    label: "DANGER",
    level: "error",
  };

  if (statusCode >= 200 && statusCode < 300) {
    result.label = "SUCCESS";
    result.level = "info";
  }
  if (statusCode >= 400 && statusCode < 500) {
    result.label = "WARNING";
    result.level = "warn";
  }
  return result;
}

function colorLog(level: string, message: string): void {
  let coloredMsg;
  switch (level) {
    case "info":
      coloredMsg = chalk.cyan(message);
      break;
    case "warn":
      coloredMsg = chalk.yellow(message);
      break;
    case "error":
      coloredMsg = chalk.red.bold(message);
      break;
    default:
      coloredMsg = chalk.white(message);
  }
  console.log(coloredMsg);
}

export const requestLogger = async (ctx: Context, next: NextFunction) => {
  const start = Date.now();
  const reqBody = JSON.stringify(ctx.body);
  const reqParams = JSON.stringify(ctx.params);
  const reqQuery = JSON.stringify(ctx.query);
  const reqHeaders = JSON.stringify(ctx.headers);

  await next();

  const duration = Date.now() - start;
  const { label, level } = getStatusLabel(ctx.status);
  const log = [
    `[${label}]`,
    `[${ctx.status}]`,
    `[${new Date().toISOString()}]`,
    ctx.method,
    ctx.originalUrl,
    "-",
    String(duration + "ms"),
  ]
    .join(" ")
    .replace(/\,/gm, " ");

  const requestResponse = JSON.stringify({
    request: {
      params: reqParams,
      body: reqBody,
      query: reqQuery,
      header: reqHeaders,
    },
    response: ctx.body || ctx.message,
  });

  const loggerMsg = `${log} property: ${requestResponse}`;

  loggerFile.log(level, loggerMsg);
  colorLog(level, log);
};
