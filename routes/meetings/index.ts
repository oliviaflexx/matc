import express, { Request, Response } from "express";
import {
  NotFoundError,
} from "../../services/errors";
import { facultyAuth } from "../../services/middleware";

import { Meeting } from "../../models/meeting";

const router = express.Router();

// show all meetings
router.get("/api/meetings/", facultyAuth, async (req: Request, res: Response) => {

  const meetings = await Meeting.find({}).sort({date: -1});

  if (!meetings) {
    throw new NotFoundError();
  }

  res.send(meetings);
});

export { router as viewMeetingsRouter };
