//title and url
import mongoose, { Mongoose } from "mongoose";

interface CourseAttrs {
  title: string;
  number: number;
  description: string;
}

interface CourseModel extends mongoose.Model<CourseDoc> {
  build(attrs: CourseAttrs): CourseDoc;
}

export interface CourseDoc extends mongoose.Document {
  title: string;
  number: number;
  description: string;
  prerequisites: CourseDoc[];
}

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prerequisites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

courseSchema.statics.build = (attrs: CourseAttrs) => {
  return new Course(attrs);
};

const Course = mongoose.model<CourseDoc, CourseModel>(
  "Course",
  courseSchema
);

export { Course };
