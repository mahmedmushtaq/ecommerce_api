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

router.post(
  "/",
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
    const {
      product_name,
      description,
      price,
      store_id,
      category_id,
      images,
      variants,
    } = req.body;

    // throws error if it is not my store
    await store.isMyStore(+req.currentUser!.id, store_id);

    const productId = await product.creatProduct({
      name: product_name,
      description,
      price,
      store_id,
      category_id,
      images,
      variants,
    });

    res.send({ message: "new product added successfully", productId });
  }
);

export default router;
