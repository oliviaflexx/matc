import request from "supertest";
import { app } from "../../../app";
import { Faculty } from "../../../models/faculty";
import mongoose from "mongoose";

const createfaculty = async () => {
  const faculty = Faculty.build({
    name: "michelle felix",
    office_location: "room 314",
    phone: "414-677-0909",
    email: "michelle@matc.edu",
    courses_taught: [],
    extra: '',
    photo: "www.url.com",
  });
  await faculty.save();
  return faculty;
};

it("returns a 200 and the correct faculty", async () => {
  const faculty = await createfaculty();

  const response = await request(app)
    .get(`/api/faculty/${faculty.id}`)
    .send()
    .expect(200);

  expect(response.body.id).toEqual(faculty.id);
  expect(response.body.name).toEqual("michelle felix");
});

it("returns 404 if faculty doesn't exist", async () => {
  const response = await request(app)
    .get(`/api/faculty/${new mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(404);
});
