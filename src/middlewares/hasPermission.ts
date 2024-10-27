import httpStatus from "http-status";
import ApiError from "../lib/ApiError";
import { Permission } from "../lib/constants";
import { asyncHandler } from "./async";

export const hasPermission = (...requiredPermissions: Permission[]) =>
  asyncHandler(async (req, _, next) => {
    const permissions = req.user?.permissions;

    if (
      !permissions ||
      !requiredPermissions.every((e) => permissions.includes(e))
    ) {
      throw new ApiError(httpStatus.FORBIDDEN, "Unauthorized");
    }

    next();
  });
