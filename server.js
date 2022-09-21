const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;

// Connect Mongodb Here

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
