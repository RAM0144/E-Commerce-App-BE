import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME || "local-fsd56we-tamil";

// username & password will be required on connecting to cloud DB
  const dbUsr = process.env.DB_USERNAME || "";
  const dbPassword = process.env.DB_PASSWORD || "";
  const dbCluster = process.env.DB_CLUSTER || ""

  // Creating a client instance

const cloudUrl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
 
// Connecting to the asynchronosly
const connectViaMongoose = async () => {
    try {
        await mongoose.connect(cloudUrl);
        console.log("Mongoose Connected Successfully");
    } catch (error) {
        console.log("Error Connecting to database", error)
        process.exit(1);
    }
};

export default connectViaMongoose;



