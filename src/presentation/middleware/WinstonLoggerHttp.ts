import morgan from "morgan";
import { container } from "../dependency-injection/container";
import { TYPE } from "@/constants";
import { type Logger } from "@/modules/Shared/domain/Logger";

export const winstonLoggerHttp = () => {
  const logger: Logger = container.get(TYPE.Logger);
  return morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {
      stream: {
        write: (message) => {
          logger.http(message.trim());
        },
      },
    }
  );
};
