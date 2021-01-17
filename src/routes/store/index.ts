import express from "express";
import storeTypeRouter from "./storeType";
import storeRouter from "./store";
import updateRouter from "./update";
const router = express.Router();

router.use("/type", storeTypeRouter);
router.use(storeRouter);
router.use(updateRouter);

export { router as storeRouter };
