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

router.get(
  "/api/courses/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const course = await Course.findById(id).populate([
      { path: "prerequisites", model: "Course" },
    ]);

    if (!course) {
      throw new NotFoundError();
    }

    res.send(course);

  }
);

export { router as showCourseRouter };
