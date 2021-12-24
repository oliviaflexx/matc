//title and url
import mongoose from "mongoose";

interface CredentialAttrs {
    title: string;
    url: string;
}

interface CredentialModel extends mongoose.Model<CredentialDoc> {
    build(attrs: CredentialAttrs): CredentialDoc;
}

export interface CredentialDoc extends mongoose.Document {
    title: string;
    url: string;
}

const credentialSchema = new mongoose.Schema(
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

credentialSchema.statics.build = (attrs: CredentialAttrs) => {
    return new Credential(attrs);
}

const Credential = mongoose.model<CredentialDoc, CredentialModel>("Credential", credentialSchema);

export { Credential };