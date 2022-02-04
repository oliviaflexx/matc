import request from "supertest";
import { app } from "../../../app";

it("returns a 201 on successful course creation", async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .post("/api/courses")
      .set("Cookie", cookie)
      .send({
        title: "a course",
        number: 101,
        description: "this is a descrip"
      })
    .expect(201);

    
});

it("doesn't allow unauthorized users to create course", async () => {
    return request(app)
      .post("/api/courses/")
      .send({
        title: "a course",
        number: 101,
        description: "this is a descrip",
      })
      .expect(401);
});

it("returns created course correctly", async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .post("/api/courses/")
      .set("Cookie", cookie)
      .send({
        title: "a course",
        number: 101,
        description: "this is a descrip",
      })
      .expect(201);

      expect(response.body.title).toEqual("a course");
      expect(response.body.number).toEqual(101);

      console.log(response.body.prerequisites);
});
it("doesn't allow empty inputs", async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .post("/api/courses/")
      .set("Cookie", cookie)
      .send({
        title: "a course",
        description: "this is a descrip",
      })
      .expect(400);

      const response2 = await request(app)
        .post("/api/courses/")
        .set("Cookie", cookie)
        .send({
          number: 101,
          description: "this is a descrip",
        })
        .expect(400);

      const response3 = await request(app)
        .post("/api/courses/")
        .set("Cookie", cookie)
        .send({
          title: "a course",
          number: 101,
        })
        .expect(400);
});