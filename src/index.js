const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const itemRoutes = require("./routes/item.routes");
const categoryRoutes = require("./routes/category.routes");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(itemRoutes);
app.use(categoryRoutes);

app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(4000);
console.log("Server on port 4000");
