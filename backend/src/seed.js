require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user.model");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany({
    email: { $in: ["user@test.com", "admin@test.com"] },
  });

  const password = await bcrypt.hash("123456", 10);

  await User.create([
    {
      firstName: "Test",
      lastName: "User",
      email: "user@test.com",
      password,
      role: "user",
    },
    {
      firstName: "Admin",
      lastName: "System",
      email: "admin@test.com",
      password,
      role: "admin",
    },
  ]);

  console.log("✅ Users conformes créés");
  process.exit();
})();
