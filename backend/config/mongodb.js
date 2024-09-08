import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log("Error in Connecting to Mongodb:", error);
  }
};

export default connectToMongoDb;
