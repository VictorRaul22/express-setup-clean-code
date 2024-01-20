import { config } from "@/modules/Shared/infrastructure/config";
import winston from "winston";
import expressWinston from "express-winston";
import { type Handler } from "express";
import "winston-daily-rotate-file";

export const winstonLoggerHttp = (): Handler => {
  const loggerHttpMiddleware = expressWinston.logger({
    level: "debug",
    transports: transportsDynamic(),
    expressFormat: true,
    colorize: false,
    meta: false,
    msg: "HTTP {{req.method}} {{res.responseTime}}ms {{req.url}}",
  });

  return loggerHttpMiddleware;
};
const transportsDynamic = (): any[] => {
  const transportsArr: any = [];
  if (config.ENVIRONMENT === "development" || config.DEBUG) {
    transportsArr.push(
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
          winston.format.prettyPrint({
            colorize: true,
          }),
          winston.format.simple(),
          winston.format.printf(
            (info) => `[${info.timestamp}] ${info.level} ${info.message}`
          )
        ),
      })
    );
  }

  transportsArr.push(
    new winston.transports.DailyRotateFile({
      level: "debug",
      filename: "logs/debug-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        winston.format.json({})
      ),
    })
  );

  return transportsArr;
};
