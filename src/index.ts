require("dotenv").config({});
import { app } from "./app";

const start = async () => {
  if (!process.env!.JWT_SECRET!) {
    throw new Error("JWT key must be valid");
  }

  // try {
  //   await dbConnection.connect();
  //   console.log("mysql is connected");
  // } catch (err) {
  //   console.log(err);
  // }

  app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
  });
};

start();
