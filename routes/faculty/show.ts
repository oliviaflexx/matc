import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, requireAuth } from "../../services/middleware";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "../../services/errors";

import { Faculty } from "../../models/faculty";

const router = express.Router();

// show faculty
router.get(
  "/api/faculty/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      throw new NotFoundError();
    }
    res.send(faculty);

  }
);

export { router as showFacultyRouter };
