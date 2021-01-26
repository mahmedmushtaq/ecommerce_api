import express from "express";
import createProductRouter from "./create";
import retrieveRouter from "./retrieve";
import updateRouter from "./update";
import deleteRouter from "./delete";

const router = express.Router();
router.use(createProductRouter);
router.use(retrieveRouter);
router.use(updateRouter);
router.use(deleteRouter);

export { router as productRouter };
