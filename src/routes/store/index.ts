import express from "express";
import storeTypeRouter from "./storeType";
import storeRouter from "./store";
const router = express.Router();

router.use(storeTypeRouter);
router.use(storeRouter);

export { router as storeRouter };
