import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/notAuthorizedError";

export const requireSeller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser?.accountType !== "seller") {
    // seller payment verification logic will come here
    throw new NotAuthorizedError();
  }

  next();
};
