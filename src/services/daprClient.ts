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

  async invoke<T extends object, R>(
    appId: string,
    methodName: string,
    method: HttpMethod,
    data?: T
  ): Promise<R> {
    try {
      logger.info(`invoke ${appId} ${methodName} ${method}`);
      return (await this.client.invoker.invoke(
        appId,
        methodName,
        method,
        method === HttpMethod.GET ? undefined : data
      )) as any;
    } catch (error) {
      logger.info(`Error ${JSON.stringify(error)}`);
      throw error;
    }
  }
}

export const daprClient = DaprClientService.getInstance();
