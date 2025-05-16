import { NextFunction, Request, Response } from "express";
import { loggerFile } from "../../libs/logger";
import chalk from "chalk";

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

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let responseBody: any;
  const start = Date.now();
  const originalSend = res.send.bind(res);

  res.send = <T>(body?: T): Response<any> => {
    responseBody = JSON.stringify(body);
    return originalSend(body);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { label, level } = getStatusLabel(res.statusCode);
    const log = [
      `[${label}]`,
      `[${res.statusCode}]`,
      `[${new Date().toISOString()}]`,
      req.method,
      req.originalUrl,
      "-",
      String(duration + "ms"),
    ]
      .join(" ")
      .replace(/\,/gm, " ");

    const requestResponse = JSON.stringify({
      request: {
        params: req.params,
        body: req.body,
        query: req.query,
        header: req.headers,
      },
      response: responseBody,
    });

    const loggerMsg = `${log} property: ${requestResponse}`;

    loggerFile.log(level, loggerMsg);
    colorLog(level, log);
  });

  next();
};
