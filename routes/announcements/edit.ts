import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import {
  validateRequest,
  requireAuth,
  adminAuth,
} from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Announcement } from "../../models/announcement";

const router = express.Router();

// show new announcement
router.put(
  "/api/announcements/:id",
  adminAuth,
  [
    body("date").notEmpty().withMessage("You must supply a date"),
    body("title").notEmpty().withMessage("You must supply a title"),
    body("creator").notEmpty().withMessage("You must supply a creator"),
    body("content").notEmpty().withMessage("You must supply content"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, title, creator, content } = req.body;

    const announcement = await Announcement.findById(id);

    if (!announcement) {
      throw new NotFoundError();
    }

    announcement.date = date;
    announcement.title = title;

    announcement.creator = creator;
    announcement.content = content;
    await announcement.save();

    res.send(announcement);
  }
);

export { router as editAnnouncementRouter };
