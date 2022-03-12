import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, adminAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Event } from "../../models/event";

const router = express.Router();

router.delete(
  "/api/events/:id",
  adminAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      throw new NotFoundError();
    }

    res.send();
  }
);

export { router as deleteEventRouter };
