import express from "express";
import createVariant from "./create";

const router = express.Router();
router.use(createVariant);

export { router as variantRouter };
