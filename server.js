require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload')


mongoose.set("strictQuery", false);

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true
}))

//database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`connected to the DB & listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

// routes

app.use("/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/categoryRoutes"))
app.use("/api", require("./routes/typeRoutes"))
app.use("/api", require("./routes/shapeRoutes"))
app.use('/api', require("./routes/brandRoutes"))
app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/upload"))
app.use("/api", require("./routes/paymentRoutes"))
