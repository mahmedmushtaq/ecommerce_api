import BaseController from "../BaseControllers";
import Utils from "../../utils";
import { BadRequestError, InternalServerError } from "../../errors";
import { storeType } from "./StoreType";
import { product } from "../product";

class Store extends BaseController {
  async createStore(data: {
    name: string;
    store_image: string;
    store_types_id: number;
    users_id: number;
  }) {
    const slug = Utils.generateSlug(data.name);
    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "INSERT INTO stores (name,slug,store_image,store_types_id,users_id) VALUES (?,?,?,?,?)",
        [data.name, slug, data.store_image, data.store_types_id, data.users_id]
      );

      return rows.insertId;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async storesList(userId: number) {
    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "select stores.id as store_id,name,stores.slug,store_image, store_types.id as store_type_id, store_types.slug as store_type_slug,store_type from stores inner JOIN store_types on stores.store_types_id=store_types.id and stores.users_id=?",
        [userId]
      );

      return rows;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async allStores() {
    try {
      const [rows]: any = await this.connection!.execute(
        "select stores.id as store_id,name,stores.slug,store_image, store_types.id as store_type_id, store_types.slug as store_type_slug,store_type from stores inner JOIN store_types on stores.store_types_id=store_types.id"
      );

      return rows;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async getMyStore(userId: number, storeId: number) {
    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "Select id from stores where id=? and users_id=?",
        [storeId, userId]
      );
      return rows;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async isMyStore(userId: number, storeId: number) {
    const data = await this.getMyStore(userId, storeId);
    if (data.length === 0) {
      throw new BadRequestError("You are not owner of this store");
    }
    return data;
  }

  async getStoreIdFromStoreStypeId(storeTypeId: number) {
    try {
      const [
        rows,
      ]: any = this.connection!.execute(
        "SELECT id from stores where store_type_id=?",
        [storeTypeId]
      );
      return rows;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async deleteStoresByStoreType(storeTypeId: number) {
    try {
      const [
        row,
      ]: any = await this.connection!.execute(
        "Select id from stores where store_types_id=?",
        [storeTypeId]
      );

      const id = row[0].id;
      await this.deleteStoreById(id);
      return;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async deleteStoreById(storeId: number) {
    try {
      const [
        row,
      ]: any = await this.connection!.execute("DELETE from stores Where id=?", [
        storeId,
      ]);

      await product.deleteProductByStoreId(storeId);
      return;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async updateStoreName(name: string, storeId: number) {
    try {
      await this.connection!.execute("Update stores set name=? where id=?", [
        name,
        storeId,
      ]);
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}

const store = new Store();

export { store };
