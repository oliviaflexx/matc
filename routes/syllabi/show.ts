import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Syllabus } from "../../models/syllabus";

const router = express.Router();

// show election
router.get(
  "/api/syllabi/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      throw new NotFoundError();
    }
    res.send(syllabus);

  }
);

export { router as showSyllabusRouter };
