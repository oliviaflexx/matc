// title and url
//title and url
import mongoose from "mongoose";

interface AnnouncementAttrs {
  date: Date;
  title: string;
  creator: string;
  content: string;
}

interface AnnouncementModel extends mongoose.Model<AnnouncementDoc> {
  build(attrs: AnnouncementAttrs): AnnouncementDoc;
}

export interface AnnouncementDoc extends mongoose.Document {
  date: Date;
  title: string;
  creator: string;
  content: string;
}

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    content: {
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

announcementSchema.statics.build = (attrs: AnnouncementAttrs) => {
  return new Announcement(attrs);
};

const Announcement = mongoose.model<AnnouncementDoc, AnnouncementModel>(
  "Announcement",
  announcementSchema
);

export { Announcement };
