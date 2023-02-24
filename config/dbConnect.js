const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected succesfuly...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;
