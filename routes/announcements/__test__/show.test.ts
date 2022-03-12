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

it("returns a 200 and the correct announcement", async () => {
  const cookie = await global.facultySignin();
  const announcement = await createAnnouncement();
  const response = await request(app)
    .get(`/api/announcements/${announcement.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.title).toEqual("announcement title");
});

it("returns 404 if announcement doesn't exist", async () => {
  const cookie = await global.adminSignin();
  const response = await request(app)
    .get(`/api/announcements/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});

it("doesn't allow unsigned in users to view", async () => {
  const response = await request(app)
    .get(`/api/announcements/${new mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(401);
});
