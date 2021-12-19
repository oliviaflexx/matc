import express, { Request, Response } from "express";
import {
  NotFoundError,
} from "../../services/errors";

import { Meeting } from "../../models/meeting";

const router = express.Router();

// show all meetings
router.get("/api/meetings/", async (req: Request, res: Response) => {

  const meetings = await Meeting.find({});

  if (!meetings) {
    throw new NotFoundError();
  }

  res.send(meetings);
});

export { router as viewMeetingsRouter };
