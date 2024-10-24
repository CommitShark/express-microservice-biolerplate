import expres, { Request, Response } from "express";
import httpStatus from "http-status";

const router = expres.Router();

router.get("/", (_: Request, res: Response) => {
  res.status(httpStatus.OK).send("Server is healthy!");
});

export default router;
