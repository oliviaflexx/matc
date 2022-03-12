import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, adminAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Syllabus } from "../../models/syllabus";

const router = express.Router();

// create new syllabus
router.delete(
  "/api/syllabi/:id",
  adminAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const syllabus = await Syllabus.findByIdAndDelete(id);

    if (!syllabus) {
      throw new NotFoundError();
    }

    res.send();
  }
);

export { router as deleteSyllabusRouter };
