import request from "supertest";
import { app } from "../../../app";

it("returns a 201 on successful event creation", async () => {
    const cookie = await global.signin();
    const response = await request(app)
      .post("/api/events/")
      .set("Cookie", cookie)
      .send({
        date: '2017-06-01',
        title: "event title",
        description: "some content",

      })
      .expect(201);

    expect(response.body.description).toEqual("some content");
});

it("it doesn't allow unsigned in users to create event", async () => {
  const response = await request(app)
    .post("/api/events/")
    .send({
      date: "2017-06-01",
      title: "event title",
      description: "some content",
    })
    .expect(401);

});

it("it returns error if input is incorrect or not provided", async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .post("/api/events/")
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      title: "event title",
      description: "",
    })
    .expect(400);

});
