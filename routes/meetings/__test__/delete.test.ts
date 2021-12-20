import request from "supertest";
import { app } from "../../../app";
import mongoose, { NativeDate } from "mongoose";
import { Meeting } from "../../../models/meeting";

const createMeeting = async () => {
    const date = new Date("2017-06-01");
  const meeting = Meeting.build({
    date: date,
    minutes: "google.docs.com",
    attendance: "google.docs.com",
    agenda: "",
  });
  await meeting.save();
  return meeting;
};

it("returns a 200 on successful meeting delete", async () => {
       const cookie = await global.signin();

       const meeting = await createMeeting();

       const response = await request(app)
         .delete(`/api/meetings/${meeting.id}`)
         .set("Cookie", cookie)
         .send()
         .expect(200);

       const oldMeeting = await Meeting.findById(meeting.id);
       expect(oldMeeting).toBeNull();
});

it("doesn't allow unauthorized users to delete meeting", async () => {
      const meeting = await createMeeting();

      const response = await request(app)
        .delete(`/api/meetings/${meeting.id}`)
        .send()
        .expect(401);
});

it("returns 404 if meeting doesn't exist", async () => {
      const cookie = await global.signin();

      const meeting = await createMeeting();

      const response = await request(app)
        .delete(`/api/meetings/${new mongoose.Types.ObjectId().toHexString()}`)
        .set("Cookie", cookie)
        .send()
        .expect(404);
});
