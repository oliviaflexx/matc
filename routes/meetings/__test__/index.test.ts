import request from "supertest";
import { app } from "../../../app";
import mongoose, { NativeDate } from "mongoose";
import { Meeting } from "../../../models/meeting";

const createMeetings = async () => {
  for (let i = 0; i < 10; i++) {
    const date = new Date("2017-06-01");
    const meeting = Meeting.build({
      date: date,
      minutes: `google.docs${i}.com`,
      attendance: "google.docs.com",
      agenda: "",
    });
    await meeting.save();
  }

  return;
};
it("returns a 200 and all meetings if signed in", async () => {
  await createMeetings();
  const cookie = await global.facultySignin();
  const response = await request(app)
    .get(`/api/meetings/`)
    .set("Cookie", cookie)
    .send()
    .expect(200);
});

it("returns 401 if unauthorized", async () => {
  await createMeetings();
  const response = await request(app)
    .get(`/api/meetings/`)
    .send()
    .expect(401);
});