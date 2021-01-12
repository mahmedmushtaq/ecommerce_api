import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { userRouter } from "./routes";
import { NotFoundError } from "./errors";
import { currentUser, errorHandler } from "./middlewares";

const app = express();
// app.set("trust proxy", true);
app.use(json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== 'test',
//   })
// );
app.use(currentUser);
app.use("/api/user", userRouter);

app.get("/", async (req, res) => {
  res.send({ message: "welcome" });
});

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
