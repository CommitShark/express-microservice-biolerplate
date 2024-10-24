import httpStatus from "http-status";
import ApiError from "../lib/ApiError";
import { asyncHandler } from "./async";

const filterAgents = asyncHandler(async (req, _, next) => {
  const userAgent = req.headers["user-agent"];

  // Check for 'unknown' values
  if (!userAgent || userAgent.includes("unknown")) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Bad Request: Unknown browser or OS"
    );
  }

  next();
});

export default filterAgents;
