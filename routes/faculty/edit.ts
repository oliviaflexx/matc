import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth, authorization } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Faculty } from "../../models/faculty";

const router = express.Router();

// create new faculty
router.put(
  "/api/faculty/:id",
  authorization,
  [body("name").notEmpty().withMessage("You must supply a name")],
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
    const { id } = req.params;

    let faculty = await Faculty.findById(id);

    if (!faculty) {
      throw new NotFoundError();
    }

    faculty.name = name;
    faculty.office_location = office_location;
    faculty.phone = phone;
    faculty.email = email;
    faculty.courses_taught = courses_taught;
    faculty.extra = extra;
    faculty.photo = photo;

    await faculty.save();

    faculty = await Faculty.findById(faculty.id).populate([
      { path: "courses_taught", model: "Course" },
    ]);
    res.send(faculty);
  }
);

export { router as editFacultyRouter };
