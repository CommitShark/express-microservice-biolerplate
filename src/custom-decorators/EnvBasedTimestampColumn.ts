import { Column } from "typeorm";
import { readEnv } from "../config/readEnv.config";

export function EnvBasedTimestampColumn(options?: {
  name?: string;
  default?: any;
  nullable?: boolean;
}) {
  const isTestEnv = readEnv("NODE_ENV") === "test";

  return Column({
    type: isTestEnv ? "text" : "timestamp",
    transformer: isTestEnv
      ? {
          to: (value?: Date) => value?.toISOString(),
          from: (value: string) => (value ? new Date(value) : null),
        }
      : undefined,
    ...options,
  });
}
