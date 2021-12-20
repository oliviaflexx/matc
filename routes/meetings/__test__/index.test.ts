import request from "supertest";
import { app } from "../../../app";
import mongoose, { NativeDate } from "mongoose";
import { Meeting } from "../../../models/meeting";

const createMeetings = async () => {

    for(let i = 0; i < 10; i++) {
        const date = new Date("2017-06-01");
        const meeting = Meeting.build({
          date: date,
          minutes: `google.docs${i}.com`,
          attendance: "google.docs.com",
          agenda: "",
        });
        await meeting.save();
    }
  
  return
};
it("returns a 200 and all meetings", async () => {
    await createMeetings();
    const response = await request(app)
      .get(`/api/meetings/`)
      .send()
      .expect(200);
});