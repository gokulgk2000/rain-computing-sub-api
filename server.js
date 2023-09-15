const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const config = require("./config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);

const mongoose = require("mongoose");


  mongoose
    .connect(config.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

    app.use(
        cors({
          origin: true,
          credentials: true,
          exposedHeaders: ["set-cookie"],
        })
      );
    app.use(express.json({ limit: "50mb" }));
    app.use(
      express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 500000,
      })
    );
    app.use(cookieParser());
  
// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.use("/api/user", require("./routes/UserRoute"));
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
return server;
