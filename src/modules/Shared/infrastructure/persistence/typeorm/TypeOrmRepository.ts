import {
  type Repository,
  type EntitySchema,
  type ObjectLiteral,
} from "typeorm";
import { TypeOrmClient } from "@/modules/Shared/infrastructure/persistence/typeorm/TypeOrmConfig";

export abstract class TypeOrmRepository<T extends ObjectLiteral> {
  private readonly _client: TypeOrmClient;
  constructor() {
    this._client = TypeOrmClient.getInstance();
    if (this._client.dataSource.isInitialized) {
      throw new Error("AppDataSource is not Initialized");
    }
  }
  protected abstract entitySchema(): EntitySchema<T>;

  protected repository(): Repository<T> {
    const test = this._client.dataSource.getRepository(
      this.entitySchema()
    );
    return test;
  }

  protected async persist(entity: T): Promise<void> {
    await this.repository().save(entity);
  }
}
