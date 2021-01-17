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

router.put(
  "/price",
  requireAuth,
  requireSeller,
  [
    body("price").not().isEmpty().withMessage("price is required"),
    body("product_id").not().isEmpty().withMessage("product_id is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { product_id, price } = req.body;

    await product.updateProductPrice(price, +req.currentUser!.id, product_id);

    res.send({ message: "product updated successfully" });
  }
);

export default router;
