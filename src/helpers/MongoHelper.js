const { MongoClient } = require("mongodb");

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
class MongoHelper {
  mongoClient = undefined;
  mongoClientDB = undefined;

  constructor() {
    this.mongoClient = new MongoClient(process.env.MONGODB_URI, options);
    this.mongoClientDB = null;
  }

  initialize = async () => {
    try {
      await this.mongoClient.connect();
      this.mongoClientDB = this.mongoClient.db("Cluster0");
    } catch (error) {
      console.error("Error initializing MongoDB:", error);
      throw error; // Rethrow the error to indicate initialization failure
    }
  };

  insertRecord = async (collectionName, recordObject) => {
    try {
      if (!this.mongoClientDB) {
        await this.initialize();
      }

      await this.mongoClientDB
        .collection(collectionName)
        .insertOne(recordObject);
    } catch (error) {
      console.error("Error inserting record into MongoDB:", error);
      throw error; // Rethrow the error to indicate insertion failure
    }
  };

  insertRecords = async (collectionName, data) => {
    try {
      // Initialize the MongoHelper instance

      if (!this.mongoClientDB) {
        await this.initialize();
      }

      // Insert the array of data into the specified collection
      await this.mongoClientDB.collection(collectionName).insertMany(data);

      console.log("Data inserted successfully.");
    } catch (error) {
      console.error("Error inserting data into MongoDB:", error);
    } finally {
      // Close the MongoDB connection
      await mongoHelper.close();
    }
  };

  fetchRecordById = async (collectionName, id) => {
    try {
      if (!this.mongoClientDB) {
        await this.initialize();
      }

      return await this.mongoClientDB
        .collection(collectionName)
        .findOne({ _id: ObjectId(id) });
    } catch (error) {
      console.error("Error fetching record from MongoDB:", error);
      throw error;
    }
  };

  queryRecords = async (collectionName, query) => {
    try {
      if (!this.mongoClientDB) {
        await this.initialize();
      }

      return await this.mongoClientDB
        .collection(collectionName)
        .find(query)
        .toArray();
    } catch (error) {
      console.error("Error querying records from MongoDB:", error);
      throw error;
    }
  };

  close = async () => {
    try {
      await this.mongoClient.close();
      console.log("MongoDB connection closed.");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
    }
  };
}

const mongoHelper = new MongoHelper();
module.exports = mongoHelper;
