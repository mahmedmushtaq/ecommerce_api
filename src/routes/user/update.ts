import express, { Request, Response } from "express";
import { body } from "express-validator";
import { user } from "../../controllers";

import { requireAuth, requireSeller, validateRequest } from "../../middlewares";

const router = express.Router();

router.put(
  "/name",
  [body("name").not().isEmpty().withMessage("name is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    await user.updateName(+req.currentUser!.id, name);
    res.send({ message: "Successfully update the user name" });
  }
);

export default router;
