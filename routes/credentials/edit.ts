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
router.put(
  "/api/credentials/:id",
  adminAuth,
  [
    body("title").notEmpty().withMessage("You must supply a title"),
    body("url").notEmpty().withMessage("You must supply a url"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, url } = req.body;
    const { id } = req.params;

    const credential = await Credential.findById(id);

    if (!credential) {
      throw new NotFoundError();
    }

    credential.title = title;
    credential.url = url;

    await credential.save();

    res.send(credential);
  }
);

export { router as editCredentialRouter };
