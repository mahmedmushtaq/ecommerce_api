import express, { Request, Response } from "express";
import { requireAdmin, requireAuth, validateRequest } from "../../middlewares";
import { body } from "express-validator";
import { category } from "../../controllers";

const router = express.Router();

 

export default router;
