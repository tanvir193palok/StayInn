import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(
      String(process.env.MONGODB_CONNECTION_STRING),
      {
        dbName: "StayInn",
      }
    );

    return conn;
  } catch (err) {
    console.error(err);
  }
}
