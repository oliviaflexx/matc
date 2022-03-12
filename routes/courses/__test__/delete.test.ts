import { Mongoose } from "mongoose";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../app";
import { Course } from "../../../models/course";

const createCourse = async () => {
  const course = Course.build({
    title: "a course",
    number: 101,
    description: "a descrip",
  });
  await course.save();
  return course;
};

it("returns a 200 on successful course delete", async () => {
  const cookie = await global.adminSignin();

  const course = await createCourse();

  const response = await request(app)
    .delete(`/api/courses/${course.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const oldCourse = await Course.findById(course.id);
  expect(oldCourse).toBeNull();
});

it("doesn't allow unauthorized users or faculty to delete course", async () => {
  const course = await createCourse();

  const response = await request(app)
    .delete(`/api/courses/${course.id}`)
    .send()
    .expect(401);

  const cookie = await global.facultySignin();
  const response2 = await request(app)
    .delete(`/api/courses/${course.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(401);
});

it("returns 404 if credential doesn't exist", async () => {
  const cookie = await global.adminSignin();

  const course = await createCourse();

  const response = await request(app)
    .delete(`/api/courses/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
