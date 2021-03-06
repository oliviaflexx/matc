import request from "supertest";
import { app } from "../../../app";
import { Election } from "../../../models/election";
import mongoose from "mongoose";

const createElection = async () => {
  const election = Election.build({
    title: "a election",
    url: "something.com",
  });
  await election.save();
  return election;
};

it("returns a 200 and the correct election", async () => {
  const election = await createElection();

  const cookie = await global.facultySignin();

  const response = await request(app)
    .get(`/api/elections/${election.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.id).toEqual(election.id);
  expect(response.body.title).toEqual("a election");
});

it("doesn't allow unsigned in users to see election", async () => {
  const election = await createElection();

  const response = await request(app)
    .get(`/api/elections/${election.id}`)
    .send()
    .expect(401);
});

it("returns 404 if election doesn't exist", async () => {
  const cookie = await global.facultySignin();
  const response = await request(app)
    .get(`/api/elections/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
