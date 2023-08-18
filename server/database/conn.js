import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import ENV from "../config.js";

async function connect() {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();
  mongoose.set("strictQuery", true);
  //const db = await mongoose.connect(getUri);
  const db = await mongoose.connect(ENV.ATLAS_URI);
  console.log("Database Connected Successfully");
  //console.log(db);

  return db;
}
export default connect;
