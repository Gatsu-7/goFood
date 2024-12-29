const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

const userRoutes = require("./routes/CreateUser");
const DisplayDataRoutes = require("./routes/DisplayData");

mongoDB()
  .then(() => {
    app.use("/api", userRoutes);
    app.use("/api", DisplayDataRoutes);

    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    app.listen(port, () => {
      console.log(`Server is running successfully on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
