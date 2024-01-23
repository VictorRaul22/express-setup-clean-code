import "dotenv/config";
import { type Config } from "../domain/Config";
import env from "env-var";

export const config: Config = {
  APP_NAME: env.get("APP_NAME").default("APP TEST").asString(),
  PORT: env.get("PORT").default(3000).asPortNumber(),
  ENVIRONMENT: env
    .get("NODE_ENV")
    .default("development")
    .asEnum(["development", "production"]),
  DATABASE: {
    DB_NAME: env.get("DB_NAME").required().asString(),
    DB_PORT: env.get("DB_PORT").default(3306).asPortNumber(),
    DB_HOST: env.get("DB_HOST").required().asString(),
    DB_USER: env.get("DB_USER").required().asString(),
    DB_PASSWORD: env.get("DB_PASSWORD").required().asString(),
    DB_DEBUG: env.get("DB_DEBUG").asBoolStrict() ?? false,
  },
  DEBUG_LOGGER: env.get("DEBUG_LOGGER").asBoolStrict() ?? false,
  HTTP_LOGGER: env.get("HTTP_LOGGER").asBoolStrict() ?? false,
};
