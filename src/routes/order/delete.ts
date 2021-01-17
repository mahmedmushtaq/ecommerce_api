import express, { Request, Response } from "express";
import { body } from "express-validator";
import { order } from "../../controllers/order";
import { requireAuth, validateRequest } from "../../middlewares";

const router = express.Router();

router.delete("/:orderId", requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;
  await order.deleteOrder(+orderId);
  res.send({ message: "Successfully deleted the order" });
});

export default router;
