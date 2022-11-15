const mongoose = require("mongoose");

// connect to the database
mongoose.connect(process.env.MONGO_URL);

// mongoose connection object
const connection = mongoose.connection;

// get notified if we connect successfully or if a connection error occurs
connection.on("connected", () => {
  console.log("MongoDB connection is successful");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

module.exports = mongoose;
