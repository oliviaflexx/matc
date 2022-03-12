import request from "supertest";
import { app } from "../../../app";
import { Syllabus } from "../../../models/syllabus";
import mongoose from "mongoose";

const createSyllabus = async () => {
  const syllabus = Syllabus.build({
    title: "a syllabus",
    url: "something.com",
  });
  await syllabus.save();
  return syllabus;
};

it("returns a 200 on successful syllabus edit", async () => {
  const cookie = await global.adminSignin();

  const syllabus = await createSyllabus();

  const response = await request(app)
    .put(`/api/syllabi/${syllabus.id}`)
    .set("Cookie", cookie)
    .send({
      title: "a syllabus 2",
      url: "something.com",
    })
    .expect(200);

  expect(response.body.id).toEqual(syllabus.id);
  expect(response.body.title).toEqual("a syllabus 2");
});

it("doesn't allow unauthorized users to edit syllabus", async () => {
  const syllabus = await createSyllabus();

  const response = await request(app)
    .put(`/api/syllabi/${syllabus.id}`)
    .send({
      title: "a syllabus 2",
      url: "something.com",
    })
    .expect(401);

  const cookie = await global.facultySignin();
  const response2 = await request(app)
    .put(`/api/syllabi/${syllabus.id}`)
    .set("Cookie", cookie)
    .send({
      title: "a syllabus 2",
      url: "something.com",
    })
    .expect(401);
});

it("returns 404 if syllabus doesn't exist", async () => {
  const cookie = await global.adminSignin();

  const response = await request(app)
    .put(`/api/syllabi/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send({
      title: "a syllabus 2",
      url: "something.com",
    })
    .expect(404);
});

it("doesn't allow invalid inputs", async () => {
  const cookie = await global.adminSignin();

  const syllabus = await createSyllabus();

  const response1 = await request(app)
    .put(`/api/syllabi/${syllabus.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      url: "something.com",
    })
    .expect(400);

  const response2 = await request(app)
    .put(`/api/syllabi/${syllabus.id}`)
    .set("Cookie", cookie)
    .send({
      title: "a title",
      url: "",
    })
    .expect(400);
});
