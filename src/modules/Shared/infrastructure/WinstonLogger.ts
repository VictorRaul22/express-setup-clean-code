import { config } from "./config";
import "winston-daily-rotate-file";
import winston, { type Logger as LoggerType } from "winston";
import { type Logger } from "../domain/Logger";
import { injectable } from "inversify";

const { combine, colorize, timestamp } = winston.format;
export const Levels = {
  ERROR: "error",
  INFO: "info",
  DEBUG: "debug",
} as const;
const optionConsole = {
  format: combine(
    colorize(),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}] ${info.message}`
    )
  ),
};

@injectable()
export class WinstonLogger implements Logger {
  private readonly logger: LoggerType;
  constructor() {
    this.logger = winston.createLogger({
      transports: this.transportsDynamic(),
    });
  }

  debug = (message: string): void => {
    if (config.DEBUG_LOGGER) {
      this.logger.debug(message);
    }
  };

  http = (message: string): void => {
    if (config.HTTP_LOGGER) {
      this.logger.http(message);
    }
  };

  error = (message: string | Error): void => {
    if (message instanceof Error) {
      this.logger.error({
        message: message.message,
        stack: message.stack,
      });
    } else {
      this.logger.error(message);
    }
  };

  info = (message: string): void => {
    this.logger.info(message);
  };

  private transportsDynamic(): any[] {
    const transportsArr: any = [];

    transportsArr.push(new winston.transports.Console(optionConsole));
    transportsArr.push(
      new winston.transports.Console({
        ...optionConsole,
        level: "http",
      })
    );
    Object.entries(Levels).forEach(([_key, value]) => {
      transportsArr.push(
        new winston.transports.DailyRotateFile({
          filename: `logs/${value}-%DATE%.log`,
          datePattern: "YYYY-MM-DD",
          maxFiles: "14d",
          format: combine(
            timestamp({
              format: "MM-DD-YYYY HH:mm:ss",
            }),
            winston.format.json()
          ),
          level: value,
        })
      );
    });
    return transportsArr;
  }
}
