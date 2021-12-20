import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, authorization } from "../../services/middleware";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "../../services/errors";

import { Meeting } from "../../models/meeting";

const router = express.Router();

// create new meeting
router.post(
  "/api/meetings/",
  authorization,
  [
    body("date").notEmpty().withMessage("You must supply a date"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { date, minutes, attendance, agenda } = req.body;

    const meeting = Meeting.build({ date, minutes, attendance, agenda});

    await meeting.save();

    res.status(201).send(meeting);
  }
);


export { router as createMeetingRouter };
