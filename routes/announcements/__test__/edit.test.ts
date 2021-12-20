import request from "supertest";
import { app } from "../../../app";
import mongoose, { NativeDate } from "mongoose";
import { Announcement } from "../../../models/announcement";

const createAnnouncement = async () => {
  const date = new Date("2017-06-01");
  const announcement = Announcement.build({
    date: date,
    title: "announcement title",
    content: "some content",
    creator: "dr. felix",
  });
  await announcement.save();
  return announcement;
};

it("returns a 200 on successful announcement edit", async () => {
  const cookie = await global.signin();
  const announcement = await createAnnouncement();
  const response = await request(app)
    .put(`/api/announcements/${announcement.id}`)
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      title: "announcement title",
      content: "some content",
      creator: "dr. felix 2",
    })
    .expect(200);

  expect(response.body.creator).toEqual("dr. felix 2");
});

it("doesn't allow unauthorized users to edit announcement", async () => {
  const announcement = await createAnnouncement();
  const response = await request(app)
    .put(`/api/announcements/${announcement.id}`)
    .send({
      date: "2017-06-01",
      title: "announcement title",
      content: "some content",
      creator: "dr. felix",
    })
    .expect(401);
});

it("returns 404 if announcement doesn't exist", async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .put(`/api/announcements/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      title: "announcement title",
      content: "some content",
      creator: "dr. felix",
    })
    .expect(404);
});

it("doesn't allow empty field change", async () => {
  const cookie = await global.signin();
  const announcement = await createAnnouncement();
  const response = await request(app)
    .put(`/api/announcements/${announcement.id}`)
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      title: "",
      content: "some content",
      creator: "dr. felix",
    })
    .expect(400);
});
