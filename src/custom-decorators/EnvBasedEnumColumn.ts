import { Column } from "typeorm";
import { readEnv } from "../config/readEnv.config";

export function EnvBasedEnumColumn(
  enumType: any,
  options?: { name?: string; default?: any; nullable?: boolean }
) {
  const isTestEnv = readEnv("NODE_ENV") === "test";

  return Column({
    type: isTestEnv ? "text" : "enum",
    enum: isTestEnv ? undefined : enumType,
    ...options,
  });
}
