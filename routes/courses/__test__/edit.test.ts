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

it("returns a 200 on successful course edit", async () => {
    const cookie = await global.signin();

    const course = await createCourse();

    const course2 = await createCourse();

    const response = await request(app)
      .put(`/api/courses/${course.id}`)
      .set("Cookie", cookie)
      .send({
        title: "a course 2",
        number: 101,
        description: "a descrip",
        prerequisites: [
          course2.id
        ]
      })
      .expect(200);

      expect(response.body.id).toEqual(course.id);
      expect(response.body.title).toEqual("a course 2");
});


it("doesn't allow unauthorized users to edit course", async () => {
    const course = await createCourse();

    const course2 = await createCourse();

    const response = await request(app)
      .put(`/api/courses/${course.id}`)
      .send({
        title: "a course 2",
        number: 101,
        description: "a descrip",
        prerequisites: [course2.id],
      })
      .expect(401);
});


it("returns 404 if credential doesn't exist", async () => {
    const cookie = await global.signin();

    const course2 = await createCourse();

    const response = await request(app)
      .put(`/api/courses/${new mongoose.Types.ObjectId().toHexString()}`)
      .set("Cookie", cookie)
      .send({
        title: "a course 2",
        number: 101,
        description: "a descrip",
        prerequisites: [course2.id],
      })
      .expect(404);
});

it("doesn't allow invalid inputs", async () => {
    const cookie = await global.signin();

    const course = await createCourse();

    const course2 = await createCourse();

    const response1 = await request(app)
      .put(`/api/courses/${course.id}`)
      .set("Cookie", cookie)
      .send({
        title: "",
        number: 101,
        description: "a descrip",
        prerequisites: [
          course2.id
        ]

      })
      .expect(400);

      const response2 = await request(app)
        .put(`/api/courses/${course.id}`)
        .set("Cookie", cookie)
        .send({
          title: "a course 2",
          number: 101,
          description: "",
          prerequisites: [],
        })
        .expect(400);
});

