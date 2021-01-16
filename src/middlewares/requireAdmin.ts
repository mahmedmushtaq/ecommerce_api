import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/notAuthorizedError";

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser?.accountType !== "admin" ) {
    throw new NotAuthorizedError();
  }

  next();
};
