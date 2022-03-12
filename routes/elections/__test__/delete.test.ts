import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { Election } from "../../../models/election";

const createElection = async () => {
  const election = Election.build({
    title: "an election",
    url: "something.com",
  });
  await election.save();
  return election;
};

it("returns a 200 on successful election delete", async () => {
  const cookie = await global.adminSignin();

  const election = await createElection();

  const response = await request(app)
    .delete(`/api/elections/${election.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const oldElection = await Election.findById(election.id);
  expect(oldElection).toBeNull();
});

it("doesn't allow unauthorized users to delete election", async () => {
  let election = await createElection();

  const response = await request(app)
    .delete(`/api/elections/${election.id}`)
    .send()
    .expect(401);

  election = await createElection();
  const cookie = await global.facultySignin();
  const response2 = await request(app)
    .delete(`/api/elections/${election.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(401);
});

it("returns 404 if election doesn't exist", async () => {
  const cookie = await global.adminSignin();

  const election = await createElection();

  const response = await request(app)
    .delete(`/api/elections/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
