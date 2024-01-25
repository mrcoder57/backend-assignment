import mongoose from "mongoose";
import { config } from "dotenv";
config()
export async function connect() {
  const dbUri = process.env.dbUri ;

  try {
    await mongoose.connect(dbUri);
    console.log("DB Connect");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

