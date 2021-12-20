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

// show election
router.get(
  "/api/elections/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const election = await Election.findById(id);

    if (!election) {
      throw new NotFoundError();
    }
    res.send(election);

  }
);

export { router as showElectionRouter };
