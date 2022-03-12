import request from "supertest";
import { app } from "../../../app";

it("returns a 201 on successful meeting creation", async () => {
  const cookie = await global.adminSignin();
  const response = await request(app)
    .post("/api/meetings/")
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      minutes: "google.docs.com",
      attendance: "google.docs.com",
      agenda: "",
    })
    .expect(201);

  expect(response.body.minutes).toEqual("google.docs.com");
});

it("it doesn't allow unsigned in users to create meeting", async () => {
  const response = await request(app)
    .post("/api/meetings/")
    .send({
      date: "2017-06-01",
      minutes: "google.docs.com",
      attendance: "google.docs.com",
      agenda: "",
    })
    .expect(401);

  const cookie = await global.facultySignin();
  const response2 = await request(app)
    .post("/api/meetings/")
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      minutes: "google.docs.com",
      attendance: "google.docs.com",
      agenda: "",
    })
    .expect(401);
});

it("it returns error if date is incorrect or not provided", async () => {
  const cookie = await global.adminSignin();
  const response = await request(app)
    .post("/api/meetings/")
    .set("Cookie", cookie)
    .send({
      date: "",
      minutes: "google.docs.com",
      attendance: "google.docs.com",
      agenda: "",
    })
    .expect(400);
});
