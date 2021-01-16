import express, { Request, Response } from "express";
import { requireAdmin, requireAuth, validateRequest } from "../../middlewares";
import { body } from "express-validator";
import { category, variant } from "../../controllers";

const router = express.Router();

router.post(
  "",
  requireAuth,
  [
    body("name").not().isEmpty().withMessage("variant name is required"),
    body("description").not().isEmpty().withMessage("description is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const variantId = await variant.createVariant({ name, description });
    res.send({ message: "Successfully added new variant", variantId });
  }
);

export default router;
