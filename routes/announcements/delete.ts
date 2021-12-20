import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, authorization } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Announcement } from "../../models/announcement";

const router = express.Router();

router.delete(
  "/api/announcements/:id",
  authorization,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      throw new NotFoundError();
    }

    res.send();
  }
);

export { router as deleteAnnouncementRouter };
