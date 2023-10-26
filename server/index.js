require("dotenv").config();
const dbConnection = require("./config/database");
const server = require("./config/server");

const startServer = async () => {
  try {
    await dbConnection();
    const port = process.env.PORT || 3000;
    server.listen(port, () =>
      console.log(`server started on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
