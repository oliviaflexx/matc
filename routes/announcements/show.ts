import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Announcement } from "../../models/announcement";

const router = express.Router();

// show new announcement
router.get(
  "/api/announcements/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const announcement = await Announcement.findById(id);

    if (!announcement) {
        throw new NotFoundError();
    };

    res.send(announcement);
  }
);

export { router as showAnnouncementRouter };
