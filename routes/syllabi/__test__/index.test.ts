import request from "supertest";
import { app } from "../../../app";
import { Syllabus } from "../../../models/syllabus";
import mongoose from "mongoose";

const createSyllabi = async () => {
  for (let i = 0; i < 10; i++) {
    const syllabus = Syllabus.build({
      title: `a syllabus ${i}`,
      url: "something.com",
    });
    await syllabus.save();
  }

  return;
};

it("returns a 200 and all syllabuss", async () => {
  await createSyllabi();

  const response = await request(app)
    .get("/api/syllabi")
    .send()
    .expect(200);

  expect(response.body.length).toEqual(10);
});
