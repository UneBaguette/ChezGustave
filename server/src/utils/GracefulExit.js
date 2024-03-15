const { mongoose } = require("../config/db_info");

async function gracefulExit() {
  try {
    await mongoose.connection.close(true);
    console.log(
      "Mongoose default connection with DB: " +
        process.env.DATABASE_NAME +
        " is disconnected through app termination"
    );
    process.exit(0);
  } catch (err) {
    console.error(err);
    throw new Error("Couldn't close db on app close");
  }
}

module.exports = gracefulExit;
