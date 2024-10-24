import dotenv from "dotenv";
import path from "path";

export function configureEnvironment(): void {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
    override: true,
  });

  if (process.env.NODE_ENV === "test") {
    dotenv.config({
      path: path.resolve(process.cwd(), ".env.test"),
      override: true,
    });
  } else if (process.env.NODE_ENV === "development") {
    dotenv.config({
      path: path.resolve(process.cwd(), ".env.local"),
      override: true,
    });
  }

  console.log("env", process.env.NODE_ENV);
}

configureEnvironment();

export function readEnv(
  key: string,
  defaultValue?: string | number
): string | undefined | number {
  const value = process.env[key];
  return value ?? defaultValue;
}

export function devEnvironment() {
  return process.env.NODE_ENV === "development";
}
