require("dotenv").config({});
import { app } from "./app";
import { dbConnection } from "./database/connection";

const start = async () => {
  console.log("starting up...");
  if (!process.env!.JWT_SECRET!) {
    throw new Error("JWT key must be valid");
  }

  try {
    dbConnection.connect();

    console.log("connected to mysql");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
  });
};

start();
