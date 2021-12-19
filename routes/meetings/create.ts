import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth } from "../../services/middleware";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "../../services/errors";

import { Meeting } from "../../models/meeting";

const router = express.Router();

// create new meeting
router.post(
  "/api/meetings/",
  [
    body("date").notEmpty().withMessage("You must supply a date"),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    const { date, minutes, attendance, agenda } = req.body;

    const meeting = Meeting.build({ date, minutes, attendance, agenda});

    await meeting.save();

    // if (req.body.minutes) {
    //   meeting.minutes = req.body.minutes;
    //   await meeting.save();
    // }
    // if (req.body.attendance) {
    //   meeting.attendance = req.body.attendance;
    //   await meeting.save();
    // }

    // if (req.body.agenda) {
    //   meeting.agenda = req.body.agenda;
    //   await meeting.save();
    // }

    res.send(meeting);
  }
);


export { router as createMeetingRouter };
