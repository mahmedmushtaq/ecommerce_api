import express from "express";
import createCategoryRouter from "./create";

const router = express.Router();
router.use(createCategoryRouter);

export { router as categoryRouter };
