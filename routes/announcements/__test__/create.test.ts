import request from "supertest";
import { app } from "../../../app";

it("returns a 201 on successful announcement creation", async () => {
    const cookie = await global.signin();
    const response = await request(app)
      .post("/api/announcements/")
      .set("Cookie", cookie)
      .send({
        date: '2017-06-01',
        title: "announcement title",
        content: "some content",
        creator: "dr. felix",
      })
      .expect(201);

    expect(response.body.content).toEqual("some content");
});

it("it doesn't allow unsigned in users to create announcement", async () => {
  const response = await request(app)
    .post("/api/announcements/")
    .send({
      date: "2017-06-01",
      title: "announcement title",
      content: "some content",
      creator: "dr. felix",
    })
    .expect(401);

});

it("it returns error if input is incorrect or not provided", async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .post("/api/announcements/")
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      title: "",
      content: "some content",
      creator: "dr. felix",
    })
    .expect(400);

});
