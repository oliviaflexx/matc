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
    extra: "",
    photo: "",
  });
  await faculty.save();
  return faculty;
};

it("returns a 200 on successful faculty edit", async () => {
  const cookie = await global.adminSignin();

  const faculty = await createfaculty();

  const response = await request(app)
    .put(`/api/faculty/${faculty.id}`)
    .set("Cookie", cookie)
    .send({
      name: "michelle felix",
      office_location: "room 314",
      phone: "414-677-0909",
      email: "michelle@matc.edu",
      courses_taught: [],
      extra: "",
      photo: "www.url.com",
    })
    .expect(200);

  expect(response.body.id).toEqual(faculty.id);
  expect(response.body.photo).toEqual("www.url.com");
});

it("doesn't allow unauthorized users to edit faculty", async () => {
  const faculty = await createfaculty();

  const response = await request(app)
    .put(`/api/faculty/${faculty.id}`)
    .send({
      name: "michelle felix",
      office_location: "room 314",
      phone: "414-677-0909",
      email: "michelle@matc.edu",
      courses_taught: [],
      extra: "",
      photo: "www.url.com",
    })
    .expect(401);

  const cookie = await global.facultySignin();
  const response2 = await request(app)
    .put(`/api/faculty/${faculty.id}`)
    .set("Cookie", cookie)
    .send({
      name: "michelle felix",
      office_location: "room 314",
      phone: "414-677-0909",
      email: "michelle@matc.edu",
      courses_taught: [],
      extra: "",
      photo: "www.url.com",
    })
    .expect(401);
});

it("returns 404 if faculty doesn't exist", async () => {
  const cookie = await global.adminSignin();

  const response = await request(app)
    .put(`/api/faculty/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send({
      name: "michelle felix",
      office_location: "room 314",
      phone: "414-677-0909",
      email: "michelle@matc.edu",
      courses_taught: [],
      extra: "",
      photo: "www.url.com",
    })
    .expect(404);
});
it("doesn't allow empty name", async () => {
  const cookie = await global.adminSignin();

  const faculty = await createfaculty();

  const response1 = await request(app)
    .put(`/api/faculty/${faculty.id}`)
    .set("Cookie", cookie)
    .send({
      name: "",
      office_location: "room 314",
      phone: "414-677-0909",
      email: "michelle@matc.edu",
      courses_taught: [],
      extra: "",
      photo: "www.url.com",
    })
    .expect(400);
});
