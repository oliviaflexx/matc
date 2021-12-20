import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Credential } from "../../models/credential";

const router = express.Router();

// show credential
router.get(
  "/api/credentials/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const credential = await Credential.findById(id);

    if (!credential) {
      throw new NotFoundError();
    }
    res.send(credential);

  }
);

export { router as showCredentialRouter };
