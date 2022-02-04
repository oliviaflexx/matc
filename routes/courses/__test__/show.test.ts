import request from "supertest";
import { app } from "../../../app";
import { Course } from "../../../models/course";
import mongoose from "mongoose";

const createCourse = async () => {
  const course = Course.build({
    title: "a course",
    number: 101,
    description: "a descrip",
  });
  await course.save();
  return course;
};

it("returns a 200 and the correct course", async () => {
    const course = await createCourse();

    const response = await request(app)
      .get(`/api/courses/${course.id}`)
      .send()
      .expect(200);

    expect(response.body.id).toEqual(course.id);
    expect(response.body.title).toEqual("a course");
});

it("returns 404 if course doesn't exist", async () => {
    const response = await request(app)
      .get(`/api/courses/${new mongoose.Types.ObjectId().toHexString()}`)
      .send()
      .expect(404);
});
