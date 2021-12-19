//title and url
import mongoose from "mongoose";

interface ElectionAttrs {
    title: string;
    url: string;
}

interface ElectionModel extends mongoose.Model<ElectionDoc> {
    build(attrs: ElectionAttrs): ElectionDoc;
}

export interface ElectionDoc extends mongoose.Document {
    title: string;
    url: string;
}

const electionSchema = new mongoose.Schema(
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

electionSchema.statics.build = (attrs: ElectionAttrs) => {
    return new Election(attrs);
}

const Election = mongoose.model<ElectionDoc, ElectionModel>("Election", electionSchema);

export { Election };