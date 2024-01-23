import { DataSource } from "typeorm";
import { config } from "../../config";
import path from "path";

export class TypeOrmClient {
  private static instance: TypeOrmClient;
  public readonly dataSource: DataSource;
  private constructor() {
    this.dataSource = new DataSource({
      type: "mysql",
      host: config.DATABASE.DB_HOST,
      port: config.DATABASE.DB_PORT,
      username: config.DATABASE.DB_USER,
      password: config.DATABASE.DB_PASSWORD,
      database: config.DATABASE.DB_NAME,
      synchronize: false,
      logging: true,
      entities: [
        path.resolve(
          __dirname,
          "../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}"
        ),
      ],
      migrations: [],
      subscribers: [],
    });
  }

  public static getInstance(): TypeOrmClient {
    if (TypeOrmClient.instance == null) {
      TypeOrmClient.instance = new TypeOrmClient();
    }
    return TypeOrmClient.instance;
  }

  public async start() {
    try {
      await this.dataSource.initialize();
      console.log("Start DataBase");
    } catch (error) {
      console.log(error);
      throw new Error("Failed to start DataBase");
    }
  }
}
