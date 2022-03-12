import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { Faculty } from "../../../models/faculty";

const createfaculty = async () => {
  const faculty = Faculty.build({
    name: "michelle felix",
    office_location: "room 314",
    phone: "414-677-0909",
    email: "michelle@matc.edu",
    courses_taught: [],
    extra: "",
    photo: "",
  });
  await faculty.save();
  return faculty;
};

it("returns a 200 on successful faculty delete", async () => {
  const cookie = await global.adminSignin();

  const faculty = await createfaculty();

  const response = await request(app)
    .delete(`/api/faculty/${faculty.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const oldfaculty = await Faculty.findById(faculty.id);
  expect(oldfaculty).toBeNull();
});

it("doesn't allow unauthorized users to delete faculty", async () => {
  const faculty = await createfaculty();

  const response = await request(app)
    .delete(`/api/faculty/${faculty.id}`)
    .send()
    .expect(401);

  const cookie = await global.facultySignin();
  const response2 = await request(app)
    .delete(`/api/faculty/${faculty.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(401);
});

it("returns 404 if faculty doesn't exist", async () => {
  const cookie = await global.adminSignin();

  const faculty = await createfaculty();

  const response = await request(app)
    .delete(`/api/faculty/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
