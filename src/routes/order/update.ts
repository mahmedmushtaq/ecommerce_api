import express, { Request, Response } from "express";
import { body } from "express-validator";
import { order } from "../../controllers/order";
import { requireAuth, requireSeller, validateRequest } from "../../middlewares";

const router = express.Router();

router.put(
  "/",
  [
    body("status").not().isEmpty().withMessage("status is required"),
    body("order_id").not().isEmpty().withMessage("product is required"),
  ],
  validateRequest,
  requireAuth,
  requireSeller,
  async (req: Request, res: Response) => {
    const { status, order_id } = req.body;
    await order.orderVerify(status, +order_id);
    res.send({ message: "updated the order successfully" });
  }
);

export default router;
