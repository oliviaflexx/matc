import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, adminAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Credential } from "../../models/credential";

const router = express.Router();

// create new election
router.delete(
  "/api/credentials/:id",
  adminAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const credential = await Credential.findByIdAndDelete(id);

    if (!credential) {
      throw new NotFoundError();
    }

    res.send();
  }
);

export { router as deleteCredentialRouter };
