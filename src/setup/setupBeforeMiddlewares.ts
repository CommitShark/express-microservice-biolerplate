import { type Application } from "express";
import morgan_config from "../config/morgan.config";
import filterAgents from "../middlewares/filterUnknownAgents";

export default function setupBeforeMiddlewares(app: Application): void {
  app.use(morgan_config);
  app.use(filterAgents);
}
