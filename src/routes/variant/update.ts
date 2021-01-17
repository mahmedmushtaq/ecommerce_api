import express, { Request, Response } from "express";
import { requireAdmin, requireAuth, validateRequest } from "../../middlewares";
import { body } from "express-validator";
import { category, variant } from "../../controllers";

const router = express.Router();

router.put(
  "",
  requireAuth,
  [
    body("name").not().isEmpty().withMessage("variant name is required"),
    body("description").not().isEmpty().withMessage("description is required"),
    body("variant_id").not().isEmpty().withMessage("variant_id is required"),
  ],
  validateRequest,
  requireAdmin,
  async (req: Request, res: Response) => {
    const { name, description, variant_id } = req.body;
    await variant.updateVariant({ name, description, id: variant_id });
    res.send({ message: "Successfully updated the variant" });
  }
);

export default router;
