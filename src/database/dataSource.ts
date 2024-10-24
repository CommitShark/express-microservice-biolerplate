import { DataSource } from "typeorm";
import path from "path";
import { readEnv } from "../config/readEnv.config";
import logger from "../config/logger.config";

const DB_HOSTNAME: string = readEnv("DB_HOST", "") as string;
const PORT: number = Number(readEnv("DB_PORT", 3306)) as number;
const DB_USERNAME: string = readEnv("DB_USERNAME", "") as string;
const DB_PASSWORD: string = readEnv("DB_PASSWORD", "") as string;
const DB_DATABASE: string = readEnv("DB_DATABASE", "") as string;
const DB_DATABASE_TYPE: string = readEnv("DB_DATABASE_TYPE", "") as string;
const NODE_ENV = readEnv("NODE_ENV") as string;

logger.info("Config");
logger.info(DB_DATABASE_TYPE);
logger.info(DB_DATABASE);

let AppDataSource: DataSource;

if (NODE_ENV === "test") {
  AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    logging: false,
    entities: [], // load models directly here
    subscribers: [],
  });
} else {
  AppDataSource = new DataSource({
    type: <"mysql" | "postgres">DB_DATABASE_TYPE, // Use SQLite in test mode
    host: DB_HOSTNAME,
    port: PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [path.join(__dirname, "../models/*.{js,ts}")], // Path to entities
    migrations: [path.join(__dirname, "migrations/*.{js,ts}")], // Path to migrations
    subscribers: [],
    ssl:
      NODE_ENV !== "production"
        ? undefined
        : {
            rejectUnauthorized: false,
          },
  });
}

export { AppDataSource };
