import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, authorization } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Meeting } from "../../models/meeting";

const router = express.Router();

// show new meeting
router.delete(
  "/api/meetings/:id",
  authorization,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const meeting = await Meeting.findByIdAndDelete(id);

    if (!meeting) {
      throw new NotFoundError();
    }

    res.send();
  }
);

export { router as deleteMeetingRouter };
