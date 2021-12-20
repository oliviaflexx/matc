import request from "supertest";
import { app } from "../../../app";
import mongoose, { NativeDate } from "mongoose";
import { Event } from "../../../models/event";

const createEvent = async () => {
  const date = new Date("2017-06-01");
  const event = Event.build({
    date: date,
    title: "event title",
    description: "some content",
  });
  await event.save();
  return event;
};

it("returns a 200 and the correct event", async () => {
  const cookie = await global.signin();
  const event = await createEvent();
  const response = await request(app)
    .get(`/api/events/${event.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.title).toEqual("event title");
});

it("returns 404 if event doesn't exist", async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .get(`/api/events/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
