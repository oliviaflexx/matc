import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, authorization } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Course } from "../../models/course";

const router = express.Router();

router.put(
  "/api/courses/:id",
  authorization,
  [
    body("title").notEmpty().withMessage("You must supply a title"),
    body("number").notEmpty().withMessage("You must supply a number"),
    body("description").notEmpty().withMessage("You must supply a description"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, number, description, prerequisites } = req.body;
    const { id } = req.params;

    let course = await Course.findById(id)
    if (!course) {
      throw new NotFoundError();
    }

    course.title = title;
    course.number = number;
    course.description = description;
    course.prerequisites = prerequisites;

    await course.save();

    course = await Course.findById(id).populate([
      { path: "prerequisites", model: "Course" },
    ]);

    res.send(course);
  }
);

export { router as editCourseRouter };
