import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, requireSeller, validateRequest } from "../../middlewares";
import { store } from "../../controllers";

const router = express.Router();

// first upload the image somewhere like aws s3 storage and then post the imageUrl in req body

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("Name Is Required"),
    body("store_image").not().isEmpty().withMessage("Name Is Required"),
    body("store_types_id")
      .not()
      .isEmpty()
      .withMessage("storeTypeId is required"),
  ],
  validateRequest,
  requireAuth,
  requireSeller,
  async (req: Request, res: Response) => {
    const { name, store_image, store_types_id } = req.body;
    await store.createStore({
      name,
      store_image,
      store_types_id,
      users_id: +req.currentUser!.id,
    });

    res.send({ message: "Store Created Successfully" });
  }
);

router.get("/", requireAuth, requireSeller, async (req, res) => {
  const data = await store.storesList(+req.currentUser!.id);
  res.send(data);
});

router.get("/all", async (req, res) => {
  const data = await store.allStores();
  res.send(data);
});

export default router;
