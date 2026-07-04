import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI is missing. Check server/.env file.');
    }

    if (mongoUri.includes('cluster.mongodb.net')) {
      throw new Error('MONGO_URI still has placeholder cluster.mongodb.net. Use your real Atlas host.');
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;