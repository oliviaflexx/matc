import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, adminAuth } from "../../services/middleware";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "../../services/errors";

import { Announcement } from "../../models/announcement";

const router = express.Router();

// create new meeting
router.post(
  "/api/announcements/",
  adminAuth,
  [
    body("date").notEmpty().withMessage("You must supply a date"),
    body("title").notEmpty().withMessage("You must supply a title"),
    body("creator").notEmpty().withMessage("You must supply a creator"),
    body("content").notEmpty().withMessage("You must supply content"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { date, title, creator, content } = req.body;

    const announcement = Announcement.build({
      date,
      title,
      creator,
      content,
    });

    await announcement.save();

    res.status(201).send(announcement);
  }
);


export { router as createAnnouncementRouter };
