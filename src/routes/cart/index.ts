import express from "express";
import { cart } from "../../controllers";
import { requireAuth } from "../../middlewares";
import addProducts from "./addProducts";
import removeProduct from "./removeProduct";

const router = express.Router();
router.use("/add", addProducts);
router.use("/remove", removeProduct);

router.get("/", requireAuth, async (req, res) => {
  const userId = +req.currentUser!.id;
  const allProducts = await cart.cartProduct(userId);
  res.send(allProducts);
});

export { router as cartRouter };
