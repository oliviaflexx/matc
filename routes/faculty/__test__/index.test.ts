import request from "supertest";
import { app } from "../../../app";
import { Faculty } from "../../../models/faculty";

const createfacultys = async () => {
  for (let i = 0; i < 10; i++) {
    const faculty = Faculty.build({
      name: "michelle felix",
      office_location: "room 314",
      phone: "414-677-0909",
      email: "michelle@matc.edu",
      courses_taught: [],
      extra: `${i}`,
      photo: "www.url.com",
    });
    await faculty.save();
  }

  return;
};

it("returns a 200 and all faculty", async () => {
  await createfacultys();

  const response = await request(app)
    .get("/api/faculty")
    .send()
    .expect(200);

  expect(response.body.length).toEqual(10);
});
