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
router.delete(
  "/api/faculty/:id",
  authorization,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const faculty = await Faculty.findByIdAndDelete(id);

    if (!faculty) {
      throw new NotFoundError();
    }

    res.send();
  }
);

export { router as deleteFacultyRouter };
