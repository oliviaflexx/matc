import request from "supertest";
import { app } from "../../../app";
import { Course } from "../../../models/course";
import mongoose from "mongoose";

const createCourses = async () => {
    for (let i = 0; i < 10; i++) {
        const course = Course.build({
          title: "a course",
          number: i,
          description: "a descrip",
        });
        await course.save();
    }
  
    return;
};

it("returns a 200 and all courses", async () => {
    await createCourses();

    const response = await request(app)
      .get("/api/courses")
      .send()
      .expect(200);
    
    expect(response.body.length).toEqual(10);
});
