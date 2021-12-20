import request from "supertest";
import { app } from "../../../app";
import { Credential } from "../../../models/credential";
import mongoose from "mongoose";

const createCredentials = async () => {
    for (let i = 0; i < 10; i++) {
        const credential = Credential.build({
          title: `a credential ${i}`,
          url: "something.com",
        });
        await credential.save();
    }
  
    return;
};

it("returns a 200 and all credentials", async () => {
    await createCredentials();

    const response = await request(app)
      .get("/api/credentials")
      .send()
      .expect(200);
    
    expect(response.body.length).toEqual(10);
});
