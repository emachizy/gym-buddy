import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/gym-buddy`);
};

export default connectDB;
