import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, adminAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Election } from "../../models/election";

const router = express.Router();

// create new election
router.post(
  "/api/elections/",
  adminAuth,
  [
    body("title").notEmpty().withMessage("You must supply a title"),
    body("url").notEmpty().withMessage("You must supply a url"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, url } = req.body;

    const election = Election.build({ title, url });

    await election.save();

    res.status(201).send(election);
  }
);


export { router as createElectionRouter };

