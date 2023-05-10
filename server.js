const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require('./app');

const port =process.env.PORT|| 3000

//4 SERVER
app.listen(port, () => {
  console.log("appp runing",port);
});

