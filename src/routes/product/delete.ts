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

router.delete(
  "/:productId",
  requireAuth,
  requireSeller,
  [
    body("product_name")
      .not()
      .isEmpty()
      .withMessage("product_name is required"),
    body("description").not().isEmpty().withMessage("description is required"),
    body("price").not().isEmpty().withMessage("description is required"),
    body("store_id").not().isEmpty().withMessage("store_id is required"),
    body("category_id").not().isEmpty().withMessage("category_id is required"),
    body("images").not().isEmpty().withMessage("image/s is/are required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const productId = req.params.productId;

    await product.deleteProductById(+productId, +req.currentUser!.id);
    res.send({ message: "Product Deleted Successfully" });

    // throws error if it is not my store
  }
);

export default router;
