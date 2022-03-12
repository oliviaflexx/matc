import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, adminAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Course } from "../../models/course";
import { currentUser } from "../../services/middleware";

const router = express.Router();

// create new course
router.post(
  "/api/courses/",
  adminAuth,
  [
    body("title").notEmpty().withMessage("You must supply a title"),
    body("number").notEmpty().withMessage("You must supply a number"),
    body("description").notEmpty().withMessage("You must supply a description"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, number, description } = req.body;

    const course = Course.build({ title, number, description });

    await course.save();

    const builtCourse = await Course.findById(course.id).populate([
      { path: "prerequisites", model: "Course" },
    ]);

    res.status(201).send(builtCourse);
  }
);


export { router as createCourseRouter };

