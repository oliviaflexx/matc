import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

 declare global {
   var adminSignin: () => Promise<string[]>;
   var facultySignin: () => Promise<string[]>;
 }

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // await mongo.stop();
  // await mongoose.connection.close();

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.adminSignin = async () => {
  const email = "test@test.com";
  const password = "password";
  const name = "admin";

  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      email,
      password,
      name
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};

global.facultySignin = async () => {
  const email = "test@test.com";
  const password = "password";
  const name = "faculty";

  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      email,
      password,
      name,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
