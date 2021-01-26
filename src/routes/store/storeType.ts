import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, requireSeller, validateRequest } from "../../middlewares";
import { storeType } from "../../controllers";

const router = express.Router();

// first upload the image somewhere like aws s3 storage and then post the imageUrl in req body

router.post(
  "/",
  [
    body("image").not().isEmpty().withMessage("Image Is Required"),
    body("store_type").not().isEmpty().withMessage("store type is required"),
  ],
  validateRequest,
  requireAuth,
  requireSeller,
  async (req: Request, res: Response) => {
    const { image, store_type } = req.body;

    await storeType.createStoreType({
      image,
      store_type,
      users_id: +req.currentUser!.id,
    });

    res.send({ message: "Store Type Created Successfully" });
  }
);

router.get("/", requireAuth, requireSeller, async (req, res) => {
  const allStoresTypes = await storeType.getAllStoreTypes(+req.currentUser!.id);
  res.send(allStoresTypes);
});

router.delete("/:storeTypeId", requireAuth, requireSeller, async (req, res) => {
  await storeType.deleteStoreType(
    +req.params.storeTypeId,
    +req.currentUser!.id
  );

  res.send({ message: "Store Type delete successfully" });
});

export default router;
