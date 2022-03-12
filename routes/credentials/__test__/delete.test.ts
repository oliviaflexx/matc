import { Mongoose } from "mongoose";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../app";
import { Credential } from "../../../models/credential";

const createCredential = async () => {
  const credential = Credential.build({
    title: "a credential",
    url: "something.com",
  });
  await credential.save();
  return credential;
};

it("returns a 200 on successful credential delete", async () => {
  const cookie = await global.adminSignin();

  const credential = await createCredential();

  const response = await request(app)
    .delete(`/api/credentials/${credential.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const oldCredential = await Credential.findById(credential.id);
  expect(oldCredential).toBeNull();
});

it("doesn't allow unauthorized users to delete credential", async () => {
  const credential = await createCredential();

  const response = await request(app)
    .delete(`/api/credentials/${credential.id}`)
    .send()
    .expect(401);

  const cookie = await global.facultySignin();

  const response2 = await request(app)
    .delete(`/api/credentials/${credential.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(401);
});

it("returns 404 if credential doesn't exist", async () => {
  const cookie = await global.adminSignin();

  const credential = await createCredential();

  const response = await request(app)
    .delete(`/api/credentials/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
