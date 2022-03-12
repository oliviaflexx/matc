import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, adminAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Course } from "../../models/course";

const router = express.Router();

router.delete(
  "/api/courses/:id",
  adminAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      throw new NotFoundError();
    }

    res.send();
  }
);

export { router as deleteCourseRouter };
