import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { Syllabus } from "../../../models/syllabus";

const createSyllabus = async () => {
  const syllabus = Syllabus.build({
    title: "an syllabus",
    url: "something.com",
  });
  await syllabus.save();
  return syllabus;
};

it("returns a 200 on successful syllabus delete", async () => {
  const cookie = await global.adminSignin();

  const syllabus = await createSyllabus();

  const response = await request(app)
    .delete(`/api/syllabi/${syllabus.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const oldsyllabus = await Syllabus.findById(syllabus.id);
  expect(oldsyllabus).toBeNull();
});

it("doesn't allow unauthorized users to delete syllabus", async () => {
  const syllabus = await createSyllabus();

  const response = await request(app)
    .delete(`/api/syllabi/${syllabus.id}`)
    .send()
    .expect(401);

  const cookie = await global.facultySignin();
  const response2 = await request(app)
    .delete(`/api/syllabi/${syllabus.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(401);
});

it("returns 404 if syllabus doesn't exist", async () => {
  const cookie = await global.adminSignin();

  const syllabus = await createSyllabus();

  const response = await request(app)
    .delete(`/api/syllabi/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
