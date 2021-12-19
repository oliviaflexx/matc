import mongoose from "mongoose";

interface MeetingAttrs {
  date: Date;
  minutes: string | null;
  attendance: string | null;
  agenda: string | null;
}

interface MeetingModel extends mongoose.Model<MeetingDoc> {
    build(attrs: MeetingAttrs): MeetingDoc;
}

export interface MeetingDoc extends mongoose.Document {
  date: Date;
  minutes: string | null;
  attendance: string | null;
  agenda: string | null;
}

const meetingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    minutes: {
      type: String,
      required: false,
    },
    attendance: {
      type: String,
      required: false,
    },
    agenda: {
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

meetingSchema.statics.build = (attrs: MeetingAttrs) => {
    return new Meeting(attrs);
}

const Meeting = mongoose.model<MeetingDoc, MeetingModel>("Meeting", meetingSchema);

export { Meeting };