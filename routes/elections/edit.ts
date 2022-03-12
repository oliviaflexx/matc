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
router.put(
  "/api/elections/:id",
  adminAuth,
  [
    body("title").notEmpty().withMessage("You must supply a title"),
    body("url").notEmpty().withMessage("You must supply a url"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, url } = req.body;
    const { id } = req.params;

    const election = await Election.findById(id);

    if (!election) {
        throw new NotFoundError();
    };

    election.title = title;
    election.url = url;

    await election.save();

    res.send(election);
  }
);

export { router as editElectionRouter };
