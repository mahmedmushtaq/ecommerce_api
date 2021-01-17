import express, { Request, Response } from "express";
import { body } from "express-validator";
import { order } from "../../controllers/order";
import { requireAuth, validateRequest } from "../../middlewares";

const router = express.Router();

router.put(
  "/payment-details",
  [
    body("payment_id").not().isEmpty().withMessage("payment_id is required"),
    body("status").not().isEmpty().withMessage("status is required"),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    const { payment_id, status } = req.body;
    await order.updatePaymentStatus(status, payment_id);
    res.send({ message: "Successfully update the payment" });
  }
);

export default router;
