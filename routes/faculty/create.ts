import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, adminAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Faculty } from "../../models/faculty";

const router = express.Router();

// create new faculty
router.post(
  "/api/faculty/",
  adminAuth,
  [
    body("name").notEmpty().withMessage("You must supply a name"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      name,
      office_location,
      phone,
      email,
      courses_taught,
      extra,
      photo,
    } = req.body;

    const faculty = Faculty.build({
      name,
      office_location,
      phone,
      email,
      courses_taught,
      extra,
      photo,
    });

    await faculty.save();

    const builtFaculty = await Faculty.findById(faculty.id).populate([
      { path: "courses_taught", model: "Course" },
    ]);

    res.status(201).send(builtFaculty);
  }
);


export { router as createFacultyRouter };

