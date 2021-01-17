import express from "express";
import createCategoryRouter from "./create";
import updateRouter from "./update";

const router = express.Router();
router.use(createCategoryRouter);
router.use(updateRouter);

export { router as categoryRouter };
