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

it("returns a 200 on successful announcement delete", async () => {
       const cookie = await global.signin();

       const announcement = await createAnnouncement();

       const response = await request(app)
         .delete(`/api/announcements/${announcement.id}`)
         .set("Cookie", cookie)
         .send()
         .expect(200);

       const oldannouncement = await Announcement.findById(announcement.id);
       expect(oldannouncement).toBeNull();
});

it("doesn't allow unauthorized users to delete announcement", async () => {
      const announcement = await createAnnouncement();

      const response = await request(app)
        .delete(`/api/announcements/${announcement.id}`)
        .send()
        .expect(401);
});

it("returns 404 if announcement doesn't exist", async () => {
      const cookie = await global.signin();

      const announcement = await createAnnouncement();

      const response = await request(app)
        .delete(`/api/announcements/${new mongoose.Types.ObjectId().toHexString()}`)
        .set("Cookie", cookie)
        .send()
        .expect(404);
});
