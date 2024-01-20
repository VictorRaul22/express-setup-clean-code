import { config } from "./config";
import "winston-daily-rotate-file";
import winston, { type Logger as LoggerType } from "winston";
import { type Logger } from "../domain/Logger";

const { combine, colorize, timestamp } = winston.format;
export const Levels = {
  DEBUG: "debug",
  ERROR: "error",
  INFO: "info",
} as const;
export class WinstonLogger implements Logger {
  private readonly logger: LoggerType;
  constructor() {
    this.logger = winston.createLogger({
      format: combine(
        timestamp({
          format: "MM-DD-YYYY HH:mm:ss",
        }),
        winston.format.json()
      ),
      transports: this.transportsDynamic(),
    });
  }

  debug = (message: string): void => {
    if (config.DEBUG) {
      this.logger.debug(message);
    }
  };

  error = (message: string | Error): void => {
    this.logger.error(message);
  };

  info = (message: string): void => {
    this.logger.info(message);
  };

  private transportsDynamic(): any[] {
    const transportsArr: any = [];
    if (config.ENVIRONMENT === "development" || config.DEBUG) {
      transportsArr.push(
        new winston.transports.Console({
          format: combine(
            colorize(),
            timestamp({
              format: "MMM-DD-YYYY HH:mm:ss",
            }),
            winston.format.printf(
              (info) => `[${info.timestamp}] ${info.level} ${info.message}`
            )
          ),
        })
      );
    }
    Object.entries(Levels).forEach(([_key, value]) => {
      transportsArr.push(
        new winston.transports.DailyRotateFile({
          filename: `logs/${value}-%DATE%.log`,

          datePattern: "YYYY-MM-DD",
          maxFiles: "14d",
          level: value,
        })
      );
    });
    return transportsArr;
  }
}
