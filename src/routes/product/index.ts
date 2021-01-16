import express from "express";
import createProductRouter from "./create";
import retrieveRouter from "./retrieve";

const router = express.Router();
router.use(createProductRouter);
router.use(retrieveRouter);

export { router as productRouter };
