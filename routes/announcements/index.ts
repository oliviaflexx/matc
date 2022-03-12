import express, { Request, Response } from "express";
import {
  NotFoundError,
} from "../../services/errors";

import {facultyAuth } from "../../services/middleware";

import { Announcement } from "../../models/announcement";

const router = express.Router();

// show all announcements
router.get("/api/announcements/", facultyAuth, async (req: Request, res: Response) => {

  const announcements = await Announcement.find({}).sort({ date: -1 });

  if (!announcements) {
    throw new NotFoundError();
  }

  res.send(announcements);
});

export { router as viewAnnouncementsRouter };
