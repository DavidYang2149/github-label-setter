// Setting up the database connection
const knex = require("knex")({
  client: "sqlite",
  connection: {
    filename: "./db/my-diabetes.db",
  },
  useNullAsDefault: true,
});
const bookshelf = require("bookshelf")(knex);

// Defining models
const Record = bookshelf.model("Record", {
  tableName: "record",
});

export default Record;
