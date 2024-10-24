import { Application } from "express";
import health_check_route from "../routes/healthCheckRoute";
import v1_route from "../routes/v1";

export default function setupRoutes(app: Application): void {
  app.use("/health", health_check_route);
  app.use("/api/v1", v1_route);
}
