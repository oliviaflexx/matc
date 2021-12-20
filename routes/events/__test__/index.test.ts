import request from "supertest";
import { app } from "../../../app";
import mongoose, { NativeDate } from "mongoose";
import { Event } from "../../../models/event";

const createevents = async () => {
  for (let i = 0; i < 10; i++) {
    const date = new Date("2017-06-01");
    const event = Event.build({
      date: date,
      title: "event title",
      description: "some content 2",
    });
    await event.save();
  }

  return;
};
it("returns a 200 and all events", async () => {
    await createevents();
    const response = await request(app)
      .get(`/api/events/`)
      .send()
      .expect(200);
});