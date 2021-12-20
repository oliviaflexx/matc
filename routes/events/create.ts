import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, authorization } from "../../services/middleware";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "../../services/errors";

import { Event } from "../../models/event";

const router = express.Router();

// create new event
router.post(
  "/api/events/",
  authorization,
  [
    body("date").notEmpty().withMessage("You must supply a date"),
    body("title").notEmpty().withMessage("You must supply a title"),
    body("description").notEmpty().withMessage("You must supply a description"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { date, title, description } = req.body;

    const event = Event.build({
      date,
      title,
      description,
    });

    await event.save();

    res.status(201).send(event);
  }
);


export { router as createEventRouter };
