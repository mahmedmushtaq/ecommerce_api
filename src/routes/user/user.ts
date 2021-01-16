import express, { Request, Response } from "express";
import { requireAuth, validateRequest, requireAdmin } from "../../middlewares";
import { userType } from "../../controllers";
import { body } from "express-validator";
import { BadRequestError } from "../../errors";

const router = express.Router();

// currentUser,

router.get("/current-user", requireAuth, async (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

router.post(
  "/admin",
  requireAuth,
  [body("userId").not().isEmpty().withMessage("userId is required")],
  validateRequest,
  requireAdmin,
  async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (req.currentUser!.id === userId) {
      throw new BadRequestError("You cannot make yourself an admin");
    }

    await userType.makeAdmin(userId);
    res.send({ message: "Successfully made the user an admin" });
  }
);

router.post(
  "/seller",
  requireAuth,
  [body("userId").not().isEmpty().withMessage("userId is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { userId } = req.body;

    await userType.makeSeller(userId);
    res.send({
      subscription_limit: 7,
      message: "Now, you have become a seller.",
    });
  }
);
export default router;
