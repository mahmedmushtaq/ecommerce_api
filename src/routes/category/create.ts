import express, { Request, Response } from "express";
import { requireAdmin, requireAuth, requireSeller, validateRequest } from "../../middlewares";
import { body } from "express-validator";
import { category } from "../../controllers";

const router = express.Router();

router.post(
  "/",
  [body("name").not().isEmpty().withMessage("name is required")],
  validateRequest,
  requireAuth,
  requireSeller,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const categoryId = await category.createCategory(name);
    res.send({ message: "Category created successfully", categoryId });
  }
);

export default router;
