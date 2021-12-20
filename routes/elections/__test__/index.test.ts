import request from "supertest";
import { app } from "../../../app";
import { Election } from "../../../models/election";
import mongoose from "mongoose";

const createElections = async () => {
  for (let i = 0; i < 10; i++) {
    const election = Election.build({
      title: `a election ${i}`,
      url: "something.com",
    });
    await election.save();
  }

  return;
};

it("returns a 200 and all elections", async () => {
  await createElections();

  const response = await request(app)
    .get("/api/elections")
    .send()
    .expect(200);

  expect(response.body.length).toEqual(10);
});
