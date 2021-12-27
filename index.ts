import dotenv from "dotenv";

import mongoose from "mongoose";
import { app } from "./app";
import { User } from "./models/user";

const PORT = process.env.PORT || 8000;

dotenv.config();


const start = async () => {

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL must be defined");
  }

  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log("connected to mongo");

  /// DEV PURPOSES ONLY

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }

  // TESTING PURPOSES
    const user = User.build({
      email: "oliviaflexx@gmail.com",
      password: "mm7373922",
      name: "oliviaflexx",
    });

    await user.save();

  app.listen(PORT, () => {
    console.log("Listening on port 8000!!!!!!!!");
  });

}
start();
