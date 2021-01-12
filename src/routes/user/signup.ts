import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { user } from "../../utils/user";
import { JWT } from "../../services";
import { BadRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";

const router = express.Router();

router.post(
  "/signup",
  [
    body("full_name")
      .not()
      .isEmpty()
      .withMessage("Please enter your full_name"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 to 20 characters"),
  ],
  validateRequest,

  async (req: Request, res: Response, next: NextFunction) => {
    const { full_name, email, password } = req.body;
    const { id } = await user.addNewUser({ name: full_name, email, password });
    // when user is sign up then default account type is user
    const userJwt = await JWT.generateJWt({ id, email, accountType: "user" });

    res.send({ full_name, email, id, token: userJwt });

    // send response
  }
);

export default router;
