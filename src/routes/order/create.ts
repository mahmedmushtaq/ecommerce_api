import express, { Request, Response } from "express";
import { body } from "express-validator";
import { order } from "../../controllers/order";
import { requireAuth, validateRequest } from "../../middlewares";

const router = express.Router();

router.post(
  "/",
  [
    body("quantity").not().isEmpty().withMessage("quantity"),
    body("product_id").not().isEmpty().withMessage("product is required"),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    const {  quantity, product_id } = req.body;
    await order.createOrder({
      user_id: +req.currentUser!.id,
      quantity,
      product_id,
    });
    res.send({ message: "Successfully created the order" });
  }
);

export default router;
