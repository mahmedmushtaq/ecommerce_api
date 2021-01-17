import express from "express";
import createProductRouter from "./create";
import retrieveRouter from "./retrieve";
import updateRouter from "./update";

const router = express.Router();
router.use(createProductRouter);
router.use(retrieveRouter);
router.use(updateRouter);

export { router as productRouter };
