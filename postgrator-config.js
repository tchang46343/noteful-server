require("dotenv").config();
module.exports = {
  migrationsDirectory: "migrations",
  driver: "pg",
  connnectionString: process.env.DATABASE_URL
};
