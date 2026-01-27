const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connecté");
};
console.log("MongoDB URI:", process.env.MONGO_URI);
