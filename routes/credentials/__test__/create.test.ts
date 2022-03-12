import request from "supertest";
import { app } from "../../../app";

it("returns a 201 on successful credential creation", async () => {
  const cookie = await global.adminSignin();

  const response = await request(app)
    .post("/api/credentials")
    .set("Cookie", cookie)
    .send({
      title: "a credential",
      url: "something.com",
    })
    .expect(201);
});

it("doesn't allow unauthorized users to create credential", async () => {
  await request(app)
    .post("/api/credentials/")
    .send({
      title: "a credential",
      url: "something.com",
    })
    .expect(401);

  const cookie = await global.facultySignin();

  const response = await request(app)
    .post("/api/credentials")
    .set("Cookie", cookie)
    .send({
      title: "a credential",
      url: "something.com",
    })
    .expect(401);
});

it("returns created credential correctly", async () => {
  const cookie = await global.adminSignin();

  const response = await request(app)
    .post("/api/credentials/")
    .set("Cookie", cookie)
    .send({
      title: "a credential",
      url: "something.com",
    })
    .expect(201);

  expect(response.body.title).toEqual("a credential");
  expect(response.body.url).toEqual("something.com");
});
it("doesn't allow empty inputs", async () => {
  const cookie = await global.adminSignin();

  const response = await request(app)
    .post("/api/credentials/")
    .set("Cookie", cookie)
    .send({
      title: "",
      url: "something.com",
    })
    .expect(400);

  const response2 = await request(app)
    .post("/api/credentials/")
    .set("Cookie", cookie)
    .send({
      title: "blah blah",
      url: "",
    })
    .expect(400);
});
