const express = require("express");
const app = express();
const PORT = process.env.port || 9080;
const userRouter = require("./routes/UserRoute");


app.use(express.json());
app.use("/user-api",userRouter)


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
