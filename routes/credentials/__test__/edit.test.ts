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

it("returns a 200 on successful credential edit", async () => {
  const cookie = await global.adminSignin();

  const credential = await createCredential();

  const response = await request(app)
    .put(`/api/credentials/${credential.id}`)
    .set("Cookie", cookie)
    .send({
      title: "a credential 2",
      url: "something.com",
    })
    .expect(200);

  expect(response.body.id).toEqual(credential.id);
  expect(response.body.title).toEqual("a credential 2");
});

it("doesn't allow unauthorized users to edit credential", async () => {
  const credential = await createCredential();

  const response = await request(app)
    .put(`/api/credentials/${credential.id}`)
    .send({
      title: "a credential 2",
      url: "something.com",
    })
    .expect(401);

  const cookie = await global.facultySignin();

  const response2 = await request(app)
    .put(`/api/credentials/${credential.id}`)
    .set("Cookie", cookie)
    .send({
      title: "a credential 2",
      url: "something.com",
    })
    .expect(401);
});

it("returns 404 if credential doesn't exist", async () => {
  const cookie = await global.adminSignin();

  const response = await request(app)
    .put(`/api/credentials/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send({
      title: "a credential 2",
      url: "something.com",
    })
    .expect(404);
});

it("doesn't allow invalid inputs", async () => {
  const cookie = await global.adminSignin();

  const credential = await createCredential();

  const response1 = await request(app)
    .put(`/api/credentials/${credential.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      url: "something.com",
    })
    .expect(400);

  const response2 = await request(app)
    .put(`/api/credentials/${credential.id}`)
    .set("Cookie", cookie)
    .send({
      title: "a title",
      url: "",
    })
    .expect(400);
});
