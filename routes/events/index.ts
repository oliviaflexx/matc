import express, { Request, Response } from "express";
import {
  NotFoundError,
} from "../../services/errors";

import { Event } from "../../models/event";

const router = express.Router();

// show all events
router.get("/api/events/", async (req: Request, res: Response) => {

  const events = await Event.find({});

  if (!events) {
    throw new NotFoundError();
  }

  res.send(events);
});

export { router as viewEventsRouter };
