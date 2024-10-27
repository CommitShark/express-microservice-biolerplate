import httpStatus from "http-status";
import ApiError from "../lib/ApiError";
import { Permission } from "../lib/constants";
import { asyncHandler } from "./async";
import logger from "../config/logger.config";

export const extractClaims = asyncHandler(async (req, _, next) => {
  const sub = req.headers["x-user-sub"] as string;
  const permissions: Permission[] =
    ((req.headers["x-user-permissions"] as string | undefined)?.split(
      ","
    ) as Permission[]) ?? [];
  const sessionId = req.headers["x-user-session"] as string;

  console.log(sub, permissions, sessionId);

  if (!sub || !sessionId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You a not permitted to make this call."
    );
  }

  const claims = {
    sessionId,
    sub,
    permissions,
  };

  logger.info(`EXTRACTED CLAIMS: ${claims}`);

  req.user = claims;

  next();
});
