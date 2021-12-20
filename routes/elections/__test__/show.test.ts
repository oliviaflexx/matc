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

  const response = await request(app)
    .get(`/api/elections/${election.id}`)
    .send()
    .expect(200);

  expect(response.body.id).toEqual(election.id);
  expect(response.body.title).toEqual("a election");
});

it("returns 404 if election doesn't exist", async () => {
  const response = await request(app)
    .get(`/api/elections/${new mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(404);
});
