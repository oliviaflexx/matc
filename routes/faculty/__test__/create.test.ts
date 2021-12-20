import request from "supertest";
import { app } from "../../../app";

it("returns a 201 on successful faculty creation", async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .post("/api/faculty")
      .set("Cookie", cookie)
      .send({
        name: "michelle felix",
        office_location: "room 314",
        phone: "414-677-0909",
        email: "michelle@matc.edu",
        courses_taught: ["english 101", "english 202"],
        extra: "",
        photo: "",
      })
      .expect(201);
});

it("doesn't allow unauthorized users to create faculty", async () => {
    return request(app)
      .post("/api/faculty/")
      .send({
        name: "michelle felix",
        office_location: "room 314",
        phone: "414-677-0909",
        email: "michelle@matc.edu",
        courses_taught: ["english 101", "english 202"],
        extra: "",
        photo: "",
      })
      .expect(401);
});

it("returns created faculty correctly", async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .post("/api/faculty")
      .set("Cookie", cookie)
      .send({
        name: "michelle felix",
        office_location: "room 314",
        phone: "414-677-0909",
        email: "michelle@matc.edu",
        courses_taught: ["english 101", "english 202"],
        extra: "",
        photo: "",
      })
      .expect(201);

    expect(response.body.name).toEqual("michelle felix");
    expect(response.body.extra).toEqual("");
});
it("doesn't allow empty name", async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .post("/api/faculty/")
      .set("Cookie", cookie)
      .send({
        name: "",
        office_location: "room 314",
        phone: "414-677-0909",
        email: "michelle@matc.edu",
        courses_taught: ["english 101", "english 202"],
        extra: "",
        photo: "",
      })
      .expect(400);

});