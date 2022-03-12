import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, facultyAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Credential } from "../../models/credential";

const router = express.Router();

// show election
router.get("/api/credentials/", facultyAuth, async (req: Request, res: Response) => {
  const credentials = await Credential.find({});

  res.send(credentials);
});

export { router as viewCredentialsRouter };
