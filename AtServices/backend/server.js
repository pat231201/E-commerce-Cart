require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const productRouter = require("./routes/productRoutes");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/product", productRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(port, () => {
      console.log(
        `Databse connected Successfully and Server started on ${port}`
      );
    })
  )
  .catch((err) => {
    console.log(err);
  });
