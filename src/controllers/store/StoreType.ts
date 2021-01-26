import { BadRequestError, InternalServerError } from "../../errors";
import BaseController from "../BaseControllers";
import Utils from "../../utils";
import { store } from "../store";

class StoreType extends BaseController {
  async createStoreType(data: {
    image: string;
    store_type: string;
    users_id: number;
  }) {
    const slug = Utils.generateSlug(data.store_type);
    try {
      const [
        rows,
      ]: any = await this.connection?.execute(
        "INSERT into store_types(image,store_type,slug,users_id) values (?,?,?,?)",
        [data.image, data.store_type, slug, data.users_id]
      );
      return rows.insertId;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }


  async getAllStoreTypes(userId:number) {
   
    try {
      const [
        rows,
      ]: any = await this.connection?.execute(
        "SELECT * FROM store_types WHERE users_id=?",
        [userId]
      );
      return rows;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async deleteStoreType(storeTypeId: number, userId: number) {
    // first delete product_variant record
    // delete product_image record
    // delete products
    // delete stores
    // and then delete product

   

    try {
      // await this.connection!.execute(
      //   "DELETE from store_types where id=? and users_id",
      //   [storeTypeId, userId]
      // );
      await store.deleteStoresByStoreType(storeTypeId);
      await this.connection!.execute(
        "DELETE from store_types where id=? and users_id",
        [storeTypeId, userId]
      );
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}

const storeType = new StoreType();

export { storeType };
