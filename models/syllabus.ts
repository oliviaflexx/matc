//title and url
import mongoose from "mongoose";

interface SyllabusAttrs {
  title: string;
  url: string;
}

interface SyllabusModel extends mongoose.Model<SyllabusDoc> {
  build(attrs: SyllabusAttrs): SyllabusDoc;
}

export interface SyllabusDoc extends mongoose.Document {
  title: string;
  url: string;
}

const syllabusSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
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

syllabusSchema.statics.build = (attrs: SyllabusAttrs) => {
  return new Syllabus(attrs);
};

const Syllabus = mongoose.model<SyllabusDoc, SyllabusModel>(
  "Syllabus",
  syllabusSchema
);

export { Syllabus };
