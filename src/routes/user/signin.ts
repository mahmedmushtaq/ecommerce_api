import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";
import { JWT } from "../../services";
import { user } from "../../controllers/user/User";

const router = express.Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be between 4 to 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const authenticate = await user.authenticate({ email, password });

    if (!authenticate) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = await JWT.generateJWt({
      id: authenticate.id,
      email: authenticate.email,
      //@ts-ignore
      accountType: authenticate.accountType,
    });

    res.send({
      full_name: authenticate.full_name,
      email,
      id: authenticate.id,
      accountType: authenticate.accountType,
      token: userJwt,
    });
  }
);

export default router;
