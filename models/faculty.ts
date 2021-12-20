//title and url
import mongoose from "mongoose";

interface FacultyAttrs {
  name: string;
  office_location: string;
  phone: string;
  email: string;
  courses_taught: string[];
  extra: string;
  photo: string;
}

interface FacultyModel extends mongoose.Model<FacultyDoc> {
  build(attrs: FacultyAttrs): FacultyDoc;
}

export interface FacultyDoc extends mongoose.Document {
  name: string;
  office_location: string | null;
  phone: string | null;
  email: string | null;
  courses_taught: string[] | null;
  extra: string | null;
  photo: string | null;
}

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    office_location: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    courses_taught: [
      {
        type: String,
        required: false,
      },
    ],
    extra: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
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

facultySchema.statics.build = (attrs: FacultyAttrs) => {
  return new Faculty(attrs);
};

const Faculty = mongoose.model<FacultyDoc, FacultyModel>(
  "Faculty",
  facultySchema
);

export { Faculty };
