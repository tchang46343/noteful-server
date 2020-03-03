require("dotenv").config();
module.exports = {
  migrationsDirectory: "migrations",
  driver: "pg",
  connnectionString: process.env.DB_URL
};
