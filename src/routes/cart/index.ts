import express from "express";
import addProducts from "./addProducts";
import removeProduct from "./removeProduct";

const router = express.Router();
router.use("/add", addProducts);
router.use("/remove", removeProduct);

export { router as cartRouter };
