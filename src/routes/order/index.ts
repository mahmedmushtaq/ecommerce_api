import express from "express";
import createRouter from "./create";
import deleteOrderRouter from "./delete";
import updateOrderRouter from "./update";
import paymentRouter from "./payment";
import orderRouter from "./order";

const router = express.Router();
router.use(createRouter);
router.use(paymentRouter);
router.use(deleteOrderRouter);
router.use(updateOrderRouter);
router.use(orderRouter);

export { router as orderRouter };
