import express, { type Express, Router } from "express";
import { type Server as HttpServer } from "http";
import cors from "cors";
import { error } from "@/presentation/middleware/error";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./dependency-injection/container";
import { winstonLoggerHttp } from "./middleware/WinstonLoggerHttp";

export class Server {
  private readonly express: Express;
  private readonly port: string;
  private readonly rootPath: string;
  httpServer?: HttpServer;
  constructor(port: string, rootPath: string) {
    this.rootPath = rootPath;
    this.port = port;
    this.express = express();
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.use(winstonLoggerHttp());
  }

  route(registerRouter: (app: Router) => void) {
    const router = Router();
    this.express.use(router);

    registerRouter(router);
  }

  buildInversifyServer() {
    const inversifyExpress = new InversifyExpressServer(
      container,
      null,
      {
        rootPath: this.rootPath,
      },
      this.express
    );

    inversifyExpress.setErrorConfig((app) => {
      app.use(error);
    });
    return inversifyExpress.build();
  }

  async listen(): Promise<void> {
    const server = this.buildInversifyServer();
    await new Promise<void>((resolve) => {
      this.httpServer = server.listen(this.port, () => {
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
