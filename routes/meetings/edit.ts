import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, adminAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Meeting } from "../../models/meeting";

const router = express.Router();

// show new meeting
router.put(
  "/api/meetings/:id",
  adminAuth,
  [
    body("date").notEmpty().withMessage("You must supply a date"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, minutes, attendance, agenda } = req.body;

    const meeting = await Meeting.findById(id);
 

    if (!meeting) {
        throw new NotFoundError();
    };

    meeting.date = new Date(date);
    console.log(new Date(date));
    meeting.minutes = minutes;

    meeting.attendance = attendance;
    meeting.agenda = agenda;
    await meeting.save();

    res.send(meeting);

  }
);

export { router as editMeetingRouter };
