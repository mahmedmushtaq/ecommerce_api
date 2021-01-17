import express, { Request, Response } from "express";
import { requireAdmin, requireAuth, validateRequest } from "../../middlewares";
import { body } from "express-validator";
import { category } from "../../controllers";

const router = express.Router();

router.put(
  "/",
  [
    body("name").not().isEmpty().withMessage("name is required"),
    body("category_id").not().isEmpty().withMessage("category_id is required"),
  ],
  validateRequest,
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response) => {
    const { name, category_id } = req.body;
    await category.updateCategory(name, category_id);
    res.send({ message: "Category updated  successfully" });
  }
);

export default router;
