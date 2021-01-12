import { Request, Response, NextFunction } from "express";
import { JWT } from "../services";
import { UserPayload } from "../services/jwt";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtToken = req.headers.token || req.body.token || req.params.token;

  if (jwtToken) {
    let user = JWT.verifyJwt(jwtToken);

    if (!!jwtToken) {
      req.currentUser = user as UserPayload;
    }
  }

  next();
};
