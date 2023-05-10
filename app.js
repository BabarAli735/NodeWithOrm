const express = require("express");
const morgan = require("morgan");
const cors=require('cors');
const app = express();
//1 MIDDELE_WARE
app.use(cors({
  origin:'http://127.0.0.1:3000/'
}))
require('./model')
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(`${__dirname}/public`));

//2 METHOOD

// //3 Routers
const resturantsRouter = require("./routes/resturants");
const authRouter = require("./routes/auth");
const userRoutRouter = require("./routes/user");


app.use("/api/v1/resturants", resturantsRouter);
app.use("/api/v1/users",authRouter);
app.use("/api/v1/users",userRoutRouter);

app.use("/", (req,res)=>{
  res.send('Hellow world')
})


module.exports=app
