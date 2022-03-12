import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, facultyAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Syllabus } from "../../models/syllabus";

const router = express.Router();

// show election
router.get("/api/syllabi/", facultyAuth, async (req: Request, res: Response) => {

  const syllabi = await Syllabus.find({});

  res.send(syllabi);
});

export { router as viewSyllabiRouter };
