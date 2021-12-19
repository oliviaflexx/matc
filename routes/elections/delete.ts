import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth } from "../../services/middleware";
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
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const election = await Election.findByIdAndDelete(id);

    if (!election) {
      throw new NotFoundError();
    }

    res.send();
  }
);

export { router as deleteElectionRouter };
