import "reflect-metadata";
import { Server } from "@/presentation/server";
import { config } from "@/modules/Shared/infrastructure/config";
import "@/presentation/controllers";

// import { TypeOrmDataBase } from "@/config/db";
export class BackendApp {
  server: Server;
  // db: TypeOrmDataBase;
  constructor() {
    this.server = new Server(config.PORT.toString());
    // this.db = new TypeOrmDataBase();
  }

  async start() {
    // this.server.route(routeApp);
    // await this.db.start();
    await this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    await this.server.stop();
  }
}
