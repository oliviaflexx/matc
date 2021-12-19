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

// create new election
router.post(
  "/api/credentials/",
  [
    body("title").notEmpty().withMessage("You must supply a title"),
    body("url").notEmpty().withMessage("You must supply a url"),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    const { title, url } = req.body;

    const credential = Credential.build({ title, url });

    await credential.save();

    res.send(credential);
  }
);


export { router as createCredentialRouter };

