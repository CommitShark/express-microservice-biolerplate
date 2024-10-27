import { Permission } from "../lib/constants";
import { IDeviceInfo, IUser, JwtAuthzPayload } from "./shared";

declare global {
  namespace Express {
    interface User {
      permissions: Permission[];
      sub: string;
      sessionId: string;
    }

    export interface Request {
      user?: User;
    }
  }
}

export {};
