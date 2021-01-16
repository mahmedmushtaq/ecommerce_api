import express, { Request, Response } from "express";
import {
  requireAdmin,
  requireAuth,
  requireSeller,
  validateRequest,
} from "../../middlewares";
import { body } from "express-validator";
import { category, product, store } from "../../controllers";

const router = express.Router();

router.get("/:storeId", async (req: Request, res: Response) => {
  const { storeId } = req.params;
  const allProducts = await product.retrieveProductByStore(+storeId);
  res.send(allProducts);
});

router.get("/", async (req, res) => {
  const allProducts = await product.retrieveAllProducts();
  res.send(allProducts);
});

export default router;
