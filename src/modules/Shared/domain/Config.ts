export interface Config {
  APP_NAME: string;
  PORT: number;
  ENVIRONMENT: "development" | "production";
  DATABASE: {
    DB_NAME: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DEBUG: boolean;
  };
  DEBUG_LOGGER: boolean;
  HTTP_LOGGER: boolean;
}
