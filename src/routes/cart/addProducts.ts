import express, { Request, Response } from "express";
import { requireAdmin, requireAuth, validateRequest } from "../../middlewares";
import { body } from "express-validator";
import { cart, category } from "../../controllers";

const router = express.Router();

router.post(
  "/",
  [body("product_id").not().isEmpty().withMessage("product_id is required")],
  async (req: Request, res: Response) => {
    await cart.addProductsIntoCart({
      users_id: +req.currentUser!.id,
      product_id: req.body.product_id,
    });

    res.send({ message: "Product added into the cart successfully" });
  }
);

export default router;
