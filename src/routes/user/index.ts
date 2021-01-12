import express from "express";
import currentUserRouter from "./currentUser";
import signInRouter from "./signin";
import signOutRouter from "./signout";
import signUpRouter from "./signup";

const router = express.Router();

router.use(currentUserRouter);
router.use(signInRouter);
router.use(signOutRouter);
router.use(signUpRouter);

export { router as userRouter };
