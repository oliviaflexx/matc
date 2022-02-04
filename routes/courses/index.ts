import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Course } from "../../models/course";

const router = express.Router();

router.get("/api/courses/", async (req: Request, res: Response) => {
  const courses = await Course.find({}).populate([
    { path: "prerequisites", model: "Course" },
  ]);

  res.send(courses);
});

export { router as viewCourseRouter };
