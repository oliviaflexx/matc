import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, authorization } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Event } from "../../models/event";

const router = express.Router();

// show new event
router.put(
  "/api/events/:id",
  authorization,
  [
    body("date").notEmpty().withMessage("You must supply a date"),
    body("title").notEmpty().withMessage("You must supply a title"),
    body("description").notEmpty().withMessage("You must supply a description"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, title, description } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      throw new NotFoundError();
    }

    event.date = date;
    event.title = title;
    event.description = description;
 
    await event.save();

    res.send(event);
  }
);

export { router as editEventRouter };
