import express, { Request, Response } from "express";
import { requireAdmin, requireAuth, validateRequest } from "../../middlewares";
import { body } from "express-validator";
import { category } from "../../controllers";

const router = express.Router();

router.post(
  "/",
  [body("name").not().isEmpty().withMessage("name is required")],
  validateRequest,
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    await category.createCategory(name);
    res.send({ message: "Category created successfully" });
  }
);

export default router;
