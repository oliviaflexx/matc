import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, facultyAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Event } from "../../models/event";

const router = express.Router();

// show event
router.get(
  "/api/events/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        throw new NotFoundError();
    };

    res.send(event);
  }
);

export { router as showEventRouter };
