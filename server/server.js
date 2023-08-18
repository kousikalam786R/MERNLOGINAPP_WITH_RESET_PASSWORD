import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.status(201).json("Home get request");
});
//** api routes */
app.use("/api", router);

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("clint/build"));
}

// start server when we have valid server connection
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`server connected to ${PORT}`);
      });
    } catch (error) {
      console.log("Can not connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database Connection..");
  });
