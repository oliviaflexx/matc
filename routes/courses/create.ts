import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, authorization } from "../../services/middleware";
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
  authorization,
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

    res.status(201).send(course);
  }
);


export { router as createCourseRouter };

