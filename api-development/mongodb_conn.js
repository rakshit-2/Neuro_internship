const mongoose = require("mongoose");

const url = "mongodb+srv://developer:developer123@cluster0.njey3.mongodb.net/neurolingua?retryWrites=true&w=majority"
//"mongodb+srv://root:root@cluster0.w1z8b.mongodb.net/neurolingua?retryWrites=true&w=majority"
//"mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";


const options = {
  sslValidate: true,
  // useNewUrlParse:true,
  dbName: "neurolingua",
  useUnifiedTopology: true,
  //  useCreateIndex: true,
};

mongoose.connect(url, options);
const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error.bind(console, "Database connection error");
  connection.close();
});

connection.once("connected", () => {
  console.log("Database connected successfully");
});

module.exports.db = connection;
