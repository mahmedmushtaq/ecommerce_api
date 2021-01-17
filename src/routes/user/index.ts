import express from "express";
import userRouter from "./user";
import signInRouter from "./signin";
import signOutRouter from "./signout";
import signUpRouter from "./signup";
import updateRouter from "./update";

const router = express.Router();

router.use(userRouter);
router.use(signInRouter);
router.use(signOutRouter);
router.use(signUpRouter);
router.use(updateRouter);

export { router as userRouter };
