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

  const response = await request(app)
    .get(`/api/syllabi/${syllabus.id}`)
    .send()
    .expect(200);

  expect(response.body.id).toEqual(syllabus.id);
  expect(response.body.title).toEqual("a syllabus");
});

it("returns 404 if syllabus doesn't exist", async () => {
  const response = await request(app)
    .get(`/api/syllabi/${new mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(404);
});
