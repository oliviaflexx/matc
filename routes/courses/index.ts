import express, { Request, Response } from "express";
import { Course } from "../../models/course";

const router = express.Router();

router.get("/api/courses/", async (req: Request, res: Response) => {
  const courses = await Course.find({}).populate([
    { path: "prerequisites", model: "Course" },
  ]);

  res.send(courses);
  console.log(courses);
});

export { router as viewCourseRouter };
