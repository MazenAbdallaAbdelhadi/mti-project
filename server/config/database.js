const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`db connection established`);
  } catch (error) {}
};

module.exports = dbConnection;
