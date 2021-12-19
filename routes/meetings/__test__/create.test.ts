import request from "supertest";
import { app } from "../../../index";

it("returns a 201 on successful meeting creation", async () => {
    const cookie = await global.signin();
  const response = await request(app)
    .post("/api/meetings/")
    .set("Cookie", cookie)
    .send({
      date: new Date(11 / 18 / 1999),
      minutes: "google.docs.com",
      attendance: "google.docs.com",
      agenda: "",
    })
    .expect(201);

    console.log(response);
});

it("it doesn't allow unsigned in users to create meeting", async () => {
  const response = await request(app)
    .post("/api/meetings/")
    .send({
      date: new Date(11 / 18 / 1999),
      minutes: "google.docs.com",
      attendance: "google.docs.com",
      agenda: "",
    })
    .expect(401);

  console.log(response);
});

it("it returns error if date is incorrect or not provided", async () => {
  const response = await request(app)
    .post("/api/meetings/")
    .send({
      date: "11/18/1999",
      minutes: "google.docs.com",
      attendance: "google.docs.com",
      agenda: "",
    })
    .expect(400);

  console.log(response);
});

it("returns correct meeting after creation", async () => {});