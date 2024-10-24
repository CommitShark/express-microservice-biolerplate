import logger from "../config/logger.config";
import { daprServer } from "../services";
import { readEnv } from "../config/readEnv.config";

export default async function setupServer(
  tryInitializeDatabase: () => Promise<void>
): Promise<void> {
  await tryInitializeDatabase();
  await daprServer.start();

  logger.info(`Application is running on ${readEnv("PORT")}`);
  logger.info("Application is running in " + readEnv("NODE_ENV") + " mode");

  process.on("SIGINT", async () => {
    daprServer.stop();
    process.exit();
  });
}
