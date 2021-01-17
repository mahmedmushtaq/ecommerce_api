import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import {
  userRouter,
  storeRouter,
  categoryRouter,
  variantRouter,
  productRouter,
  orderRouter,
  cartRouter,
} from "./routes";
import { NotFoundError } from "./errors";
import { currentUser, errorHandler } from "./middlewares";

const app = express();
// dbConnection.connect();
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
app.use("/api/store", storeRouter);
app.use("/api/category", categoryRouter);
app.use("/api/variant", variantRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);

app.get("/", async (req, res) => {
  res.send({ message: "welcome" });
});

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
