import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, authorization } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Election } from "../../models/election";

const router = express.Router();

// create new election
router.delete(
  "/api/elections/:id",
  authorization,
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
