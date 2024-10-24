import { DaprClient, HttpMethod } from "@dapr/dapr";
import { readEnv } from "../config/readEnv.config";
import logger from "../config/logger.config";

const stage = readEnv("NODE_ENV", "development");

class DaprClientService {
  private static instance: DaprClientService | null = null;
  private readonly client: DaprClient;

  private constructor(daprPort: string) {
    this.client = new DaprClient({
      daprPort,
    });
  }

  static getInstance(): DaprClientService {
    if (!DaprClientService.instance) {
      DaprClientService.instance = new DaprClientService(
        readEnv("DAPR_HTTP_PORT") as string
      );
    }
    return DaprClientService.instance;
  }

  async publishNotification<T extends object>(topic: string, data: T) {
    const pubsub = readEnv("DAPR_NOTIFICATION_PUBSUB_NAME") as string;
    try {
      logger.info(`publishNotification ${topic} pubsub: ${pubsub}`);
      return await this.client.pubsub.publish(
        pubsub,
        `${topic}_${stage}`,
        data
      );
    } catch (error) {
      logger.info(`Error ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async publishPaymentEvent<T extends object>(topic: string, data: T) {
    const pubsub = readEnv("DAPR_PAYMENT_PUBSUB_NAME") as string;
    try {
      logger.info(`publishNotification ${topic} pubsub: ${pubsub}`);
      return await this.client.pubsub.publish(
        pubsub,
        `${topic}_${stage}`,
        data
      );
    } catch (error) {
      logger.info(`Error ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async invoke<T extends object>(
    appId: string,
    methodName: string,
    method: HttpMethod,
    data: T,
    headers: any = {}
  ) {
    if (!headers["x-user-sub"]) {
      headers["x-user-sub"] = JSON.stringify({ sub: "auto", user_role: "" });
    }

    try {
      logger.info(`invoke ${appId} ${methodName} ${method}`);
      return await this.client.invoker.invoke(
        appId,
        methodName,
        method,
        method === HttpMethod.GET ? undefined : data,
        {
          headers,
        }
      );
    } catch (error) {
      logger.info(`Error ${JSON.stringify(error)}`);
      throw error;
    }
  }
}

export const daprClient = DaprClientService.getInstance();
