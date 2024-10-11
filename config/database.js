const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://asheeshsahu7300:yASn6iJnajdDoFMm@cluster0.1960z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"||process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
