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

it("returns a 200 on successful election edit", async () => {
  const cookie = await global.adminSignin();

  const election = await createElection();

  const response = await request(app)
    .put(`/api/elections/${election.id}`)
    .set("Cookie", cookie)
    .send({
      title: "a election 2",
      url: "something.com",
    })
    .expect(200);

  expect(response.body.id).toEqual(election.id);
  expect(response.body.title).toEqual("a election 2");
});

it("doesn't allow unauthorized users to edit election", async () => {
  let election = await createElection();

  const response = await request(app)
    .put(`/api/elections/${election.id}`)
    .send({
      title: "a election 2",
      url: "something.com",
    })
    .expect(401);

  election = await createElection();
  const cookie = await global.facultySignin();
  const response2 = await request(app)
    .put(`/api/elections/${election.id}`)
    .set("Cookie", cookie)
    .send({
      title: "a election 2",
      url: "something.com",
    })
    .expect(401);
});

it("returns 404 if election doesn't exist", async () => {
  const cookie = await global.adminSignin();

  const response = await request(app)
    .put(`/api/elections/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send({
      title: "a election 2",
      url: "something.com",
    })
    .expect(404);
});

it("doesn't allow invalid inputs", async () => {
  const cookie = await global.adminSignin();

  const election = await createElection();

  const response1 = await request(app)
    .put(`/api/elections/${election.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      url: "something.com",
    })
    .expect(400);

  const response2 = await request(app)
    .put(`/api/elections/${election.id}`)
    .set("Cookie", cookie)
    .send({
      title: "a title",
      url: "",
    })
    .expect(400);
});
