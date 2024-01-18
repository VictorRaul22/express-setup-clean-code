import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";
import { type Server as HttpServer } from "http";
import cors from "cors";
import httpStatus from "http-status";

import { winstonLoggerHttp } from "@/presentation/middleware/WinstonLoggerHttp";
import { WinstonLogger } from "@/modules/Shared/infrastructure/WinstonLogger";
export class Server {
  private readonly express: Express;
  readonly port: string;
  httpServer?: HttpServer;
  logger: WinstonLogger;
  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.logger = new WinstonLogger();
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
  }

  route(registerRouter: (app: Router) => void) {
    const router = Router();
    router.use(winstonLoggerHttp());
    this.express.use(router);
    router.get("/", (_req: Request, res: Response) => {
      res.send("hello world");
    });
    registerRouter(router);
    router.use(
      (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        this.logger.error(err.message + err.stack);
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR as number)
          .send("Internal Server Error");
      }
    );
  }

  async listen(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log("Starting Server on port " + this.port);
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.httpServer !== null && this.httpServer !== undefined) {
        this.httpServer.close((error) => {
          if (error != null) {
            reject(error);
            return;
          }
          resolve();
        });
      }
      resolve();
    });
  }
}
