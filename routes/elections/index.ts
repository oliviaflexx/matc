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
router.get("/api/elections/", async (req: Request, res: Response) => {

  const elections = await Election.find({});

  res.send(elections);
});

export { router as viewElectionsRouter };
