import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
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
it("returns a 200 on successful meeting edit", async () => {
        const cookie = await global.signin();
        const meeting = await createMeeting();
        const response = await request(app)
          .put(`/api/meetings/${meeting.id}`)
          .set("Cookie", cookie)
          .send({
            date: "2017-06-01",
            minutes: "google.docs.com",
            attendance: "",
            agenda: "google.docs.com",
          })
          .expect(200);

        expect(response.body.agenda).toEqual("google.docs.com");
});

it("doesn't allow unauthorized users to edit meeting", async () => {
    const meeting = await createMeeting();
    const response = await request(app)
      .put(`/api/meetings/${meeting.id}`)
      .send({
        date: "2017-06-01",
        minutes: "google.docs.com",
        attendance: "google.docs.com",
        agenda: "google.docs.com",
      })
      .expect(401);
});

it("returns 404 if meeting doesn't exist", async () => {
    const cookie = await global.signin();
    const response = await request(app)
      .put(`/api/meetings/${new mongoose.Types.ObjectId().toHexString()}`)
      .set("Cookie", cookie)
      .send({
        date: "2017-06-01",
        minutes: "google.docs.com",
        attendance: "google.docs.com",
        agenda: "google.docs.com",
      })
      .expect(404);

});

it("doesn't allow invalid date change", async () => {
    const cookie = await global.signin();
    const meeting = await createMeeting();
    const response = await request(app)
      .put(`/api/meetings/${meeting.id}`)
      .set("Cookie", cookie)
      .send({
        date: "",
        minutes: "google.docs.com",
        attendance: "google.docs.com",
        agenda: "google.docs.com",
      })
      .expect(400);
});

