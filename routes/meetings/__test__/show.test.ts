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

it("returns a 200 and the correct meeting", async () => {
  const cookie = await global.adminSignin();
  const meeting = await createMeeting();
  const response = await request(app)
    .get(`/api/meetings/${meeting.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.agenda).toEqual("");
});

it("returns 401 if not signed in", async () => {
  const meeting = await createMeeting();
  const response = await request(app)
    .get(`/api/meetings/${meeting.id}`)
    .send()
    .expect(401);
});

it("returns 404 if meeting doesn't exist", async () => {
  const cookie = await global.adminSignin();
  const response = await request(app)
    .get(`/api/meetings/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
