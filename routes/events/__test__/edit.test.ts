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

it("returns a 200 on successful event edit", async () => {
  const cookie = await global.adminSignin();
  const event = await createEvent();
  const response = await request(app)
    .put(`/api/events/${event.id}`)
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      title: "event title",
      description: "some content 2",
    })
    .expect(200);

  expect(response.body.description).toEqual("some content 2");
});

it("doesn't allow unauthorized users to edit event", async () => {
  const event = await createEvent();
  const response = await request(app)
    .put(`/api/events/${event.id}`)
    .send({
      date: "2017-06-01",
      title: "event title",
      description: "some content 2",
    })
    .expect(401);

  const cookie = await global.facultySignin();
  const response2 = await request(app)
    .put(`/api/events/${event.id}`)
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      title: "event title",
      description: "some content 2",
    })
    .expect(401);
  
});

it("returns 404 if event doesn't exist", async () => {
  const cookie = await global.adminSignin();
  const response = await request(app)
    .put(`/api/events/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      title: "event title",
      description: "some content 2",
    })
    .expect(404);
});

it("doesn't allow empty field change", async () => {
  const cookie = await global.adminSignin();
  const event = await createEvent();
  const response = await request(app)
    .put(`/api/events/${event.id}`)
    .set("Cookie", cookie)
    .send({
      date: "2017-06-01",
      title: "",
      description: "some content 2",
    })
    .expect(400);
});
