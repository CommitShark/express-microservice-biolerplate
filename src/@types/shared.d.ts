import { JwtPayload } from "jsonwebtoken";
import { Permission } from "../lib/constants";

export interface JwtOpenIDPayload extends JwtPayload {
  sub: string;
  scope: string;
}

export interface JwtAuthzPayload extends JwtPayload {
  sessionId: string;
  tokenVersion: number;
  permissions: Permission[];
}

export interface IDeviceInfo {
  ip: string;
  browser: string;
  os: string;
}
