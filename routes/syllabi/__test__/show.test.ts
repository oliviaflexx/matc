import request from "supertest";
import { app } from "../../../app";
import { Syllabus } from "../../../models/syllabus";
import mongoose from "mongoose";

const createsyllabus = async () => {
  const syllabus = Syllabus.build({
    title: "a syllabus",
    url: "something.com",
  });
  await syllabus.save();
  return syllabus;
};

it("returns a 200 and the correct syllabus", async () => {
  const syllabus = await createsyllabus();
  const cookie = await global.facultySignin();
  const response = await request(app)
    .get(`/api/syllabi/${syllabus.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.id).toEqual(syllabus.id);
  expect(response.body.title).toEqual("a syllabus");
});

it("doesn't show syllabus if not signed in", async () => {
  const syllabus = await createsyllabus();
  const response = await request(app)
    .get(`/api/syllabi/${syllabus.id}`)
    .send()
    .expect(401);
});

it("returns 404 if syllabus doesn't exist", async () => {
  const cookie = await global.facultySignin();
  const response = await request(app)
    .get(`/api/syllabi/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
