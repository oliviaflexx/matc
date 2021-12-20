import request from "supertest";
import { app } from "../../../app";
import { Credential } from "../../../models/credential";
import mongoose from "mongoose";

const createCredential = async () => {
  const credential = Credential.build({
    title: "a credential",
    url: "something.com",
  });
  await credential.save();
  return credential;
};

it("returns a 200 and the correct credential", async () => {
    const credential = await createCredential();

    const response = await request(app)
      .get(`/api/credentials/${credential.id}`)
      .send()
      .expect(200);

    expect(response.body.id).toEqual(credential.id);
    expect(response.body.title).toEqual("a credential");
});

it("returns 404 if credential doesn't exist", async () => {
    const response = await request(app)
      .get(`/api/credentials/${new mongoose.Types.ObjectId().toHexString()}`)
      .send()
      .expect(404);
});
