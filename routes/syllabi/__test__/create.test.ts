import request from "supertest";
import { app } from "../../../app";

it("returns a 201 on successful syllabus creation", async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .post("/api/syllabi")
        .set("Cookie", cookie)
        .send({
        title: "an syllabus",
        url: "something.com",
        })
        .expect(201);
});

it("doesn't allow unauthorized users to create syllabus", async () => {
    return request(app)
      .post("/api/syllabi/")
      .send({
        title: "an syllabus",
        url: "something.com",
      })
      .expect(401);
});

it("returns created syllabus correctly", async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .post("/api/syllabi")
      .set("Cookie", cookie)
      .send({
        title: "an syllabus",
        url: "something.com",
      })
      .expect(201);

    expect(response.body.title).toEqual("an syllabus");
    expect(response.body.url).toEqual("something.com");
});
it("doesn't allow empty inputs", async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .post("/api/syllabi/")
      .set("Cookie", cookie)
      .send({
        title: "",
        url: "something.com",
      })
      .expect(400);

    const response2 = await request(app)
      .post("/api/syllabi/")
      .set("Cookie", cookie)
      .send({
        title: "blah blah",
        url: "",
      })
      .expect(400);
});