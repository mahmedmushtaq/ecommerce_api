import express, { Request, Response } from "express";
import { body } from "express-validator";
import { store } from "../../controllers";

import { requireAuth, requireSeller, validateRequest } from "../../middlewares";

const router = express.Router();

router.put(
  "/name",
  [
    body("name").not().isEmpty().withMessage("name is required"),
    body("store_id").not().isEmpty().withMessage("store_id is required"),
  ],
  validateRequest,
  requireAuth,
  requireSeller,
  async (req: Request, res: Response) => {
    const { name, store_id } = req.body;
    await store.isMyStore(+req.currentUser!.id, store_id);
    await store.updateStoreName(name, store_id);
    res.send({ message: "Successfully update the store" });
  }
);

export default router;
