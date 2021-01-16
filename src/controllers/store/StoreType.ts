import { BadRequestError, InternalServerError } from "../../errors";
import BaseController from "../BaseControllers";
import Utils from "../../utils";

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
}

const storeType = new StoreType();

export { storeType };
