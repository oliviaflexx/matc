import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { Event } from "../../../models/event";

const createevent = async () => {
  const date = new Date("2017-06-01");
  const event = Event.build({
    date: date,
    title: "event title",
    description: "some content",
  });
  await event.save();
  return event;
};

it("returns a 200 on successful event delete", async () => {
       const cookie = await global.adminSignin();

       const event = await createevent();

       const response = await request(app)
         .delete(`/api/events/${event.id}`)
         .set("Cookie", cookie)
         .send()
         .expect(200);

       const oldevent = await Event.findById(event.id);
       expect(oldevent).toBeNull();
});

it("doesn't allow unauthorized users to delete event", async () => {
      const event = await createevent();

      const response = await request(app)
        .delete(`/api/events/${event.id}`)
        .send()
        .expect(401);

      const cookie = await global.facultySignin();
      const event2 = await createevent();
      const response2 = await request(app)
        .delete(`/api/events/${event2.id}`)
        .set("Cookie", cookie)
        .send()
        .expect(401);
      
});

it("returns 404 if event doesn't exist", async () => {
      const cookie = await global.adminSignin();

      const event = await createevent();

      const response = await request(app)
        .delete(`/api/events/${new mongoose.Types.ObjectId().toHexString()}`)
        .set("Cookie", cookie)
        .send()
        .expect(404);
});
