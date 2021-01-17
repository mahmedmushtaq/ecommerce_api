import express, { Request, Response } from "express";
import { body } from "express-validator";
import { order } from "../../controllers/order";
import { requireAuth, requireSeller, validateRequest } from "../../middlewares";

const router = express.Router();

router.get("/unverified-list", requireAuth, requireSeller, async (req, res) => {
  const orders = await order.allUnverfiedOrders(+req.currentUser!.id);
  res.send(orders);
});

router.get("/", requireAuth, async (req, res) => {
  const orders = await order.myOrders(+req.currentUser!.id);
  res.send(orders);
});



export default router;
