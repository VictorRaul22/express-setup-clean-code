import "reflect-metadata";
import { Server } from "@/presentation/server";
import { config } from "@/modules/Shared/infrastructure/config";
import "@/presentation/controllers";
import { TypeOrmClient } from "@/modules/Shared/infrastructure/persistence/typeorm/TypeOrmConfig";

export class BackendApp {
  server: Server;
  client: TypeOrmClient;
  constructor() {
    this.client = TypeOrmClient.getInstance();
    this.server = new Server(config.PORT.toString(), "/api/v1");
  }

  async start() {
    await this.client.start();
    await this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    await this.server.stop();
  }
}
