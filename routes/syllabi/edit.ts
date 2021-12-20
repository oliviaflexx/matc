import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, authorization } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Syllabus } from "../../models/syllabus";

const router = express.Router();

// create new election
router.put(
  "/api/syllabi/:id",
  authorization,
  [
    body("title").notEmpty().withMessage("You must supply a title"),
    body("url").notEmpty().withMessage("You must supply a url"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, url } = req.body;
    const { id } = req.params;

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      throw new NotFoundError();
    };

    syllabus.title = title;
    syllabus.url = url;

    await syllabus.save();

    res.send(syllabus);
  }
);

export { router as editSyllabusRouter };
