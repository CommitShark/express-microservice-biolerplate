import app from "../app";
import { DaprServer } from "@dapr/dapr";
import { type Express } from "express";
import { readEnv } from "../config/readEnv.config";
import logger from "../config/logger.config";

const stage = readEnv("NODE_ENV", "development");

export class DaprServerService extends DaprServer {
  private static instance: DaprServerService | null = null;
  private readonly server: DaprServer;

  private constructor(
    serverHost: string,
    serverPort: string,
    serverHttp: Express,
    daprHost: string,
    daprPort: string
  ) {
    super({
      serverHost,
      serverPort,
      serverHttp,
      clientOptions: {
        daprHost,
        daprPort,
      },
    });
    this.server = this;
  }

  static getInstance(): DaprServerService {
    if (!DaprServerService.instance) {
      DaprServerService.instance = new DaprServerService(
        readEnv("APP_HOST") as string,
        readEnv("PORT") as string,
        app,
        readEnv("DAPR_HOST") as string,
        readEnv("DAPR_HTTP_PORT") as string
      );
    }
    return DaprServerService.instance;
  }

  subscribeToNotification(topic: string, callback: Function) {
    logger.info(`Subscribe to topic: ${topic}`);
    return this.server.pubsub.subscribe(
      readEnv("DAPR_AUTH_PUBSUB_NAME") as string,
      `${topic}_${stage}`,
      async (data) => {
        logger.info(`Received ${topic} event..`);
        callback(data);
      }
    );
  }
}

export const daprServer = DaprServerService.getInstance();
