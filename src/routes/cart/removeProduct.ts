import express, { Request, Response } from "express";
import { requireAdmin, requireAuth, validateRequest } from "../../middlewares";
import { body } from "express-validator";
import { cart, category } from "../../controllers";

const router = express.Router();

router.delete("/:productId", async (req: Request, res: Response) => {
  await cart.deleteProductFromCart({
    users_id: +req.currentUser!.id,
    product_id: +req.params.productId,
  });

  res.send({ message: "Product deleted successfully" });
});

export default router;
