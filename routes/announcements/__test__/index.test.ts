import request from "supertest";
import { app } from "../../../app";
import mongoose, { NativeDate } from "mongoose";
import { Announcement } from "../../../models/announcement";

const createAnnouncements = async () => {
  for (let i = 0; i < 10; i++) {
    const date = new Date("2017-06-01");
    const announcement = Announcement.build({
      date: date,
      title: "announcement title",
      content: "some content",
      creator: `dr. felix ${i}`,
    });
    await announcement.save();
  }

  return;
};
it("returns a 200 and all announcements", async () => {
    await createAnnouncements();
    const response = await request(app)
      .get(`/api/announcements/`)
      .send()
      .expect(200);
});