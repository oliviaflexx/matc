import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "./errors";
import { validationResult } from "express-validator";
import { RequestValidationError } from "./errors";

interface UserPayload {
  id: string;
  email: string;
  name: string;
}

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
  const token = req.cookies.access_token;
  if (!token) {
    return next();
  }
  try {
    const data = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = data;
    return next();
  } catch {
    return next();
  }
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    throw new NotAuthorizedError();
  }
  try {
    const data = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;;
    req.currentUser = data;
    return next();
  } catch {
    throw new NotAuthorizedError();
  }
};