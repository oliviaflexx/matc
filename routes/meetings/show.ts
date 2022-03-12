import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, facultyAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Meeting } from "../../models/meeting";

const router = express.Router();

// show new meeting
router.get(
  "/api/meetings/:id",
  facultyAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const meeting = await Meeting.findById(id);

    if (!meeting) {
        throw new NotFoundError();
    };

    res.send(meeting);
  }
);

export { router as showMeetingRouter };
