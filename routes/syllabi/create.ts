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
router.post(
  "/api/syllabi/",
  adminAuth,
  [
    body("title").notEmpty().withMessage("You must supply a title"),
    body("url").notEmpty().withMessage("You must supply a url"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, url } = req.body;

    const syllabus = Syllabus.build({ title, url });
    
    await syllabus.save();
    
    res.status(201).send(syllabus);
  }
);


export { router as createSyllabusRouter };

