import { BadRequestError, InternalServerError } from "../../errors";
import BaseController from "../BaseControllers";

interface cartDataType {
  users_id: number;
  product_id: number;
}
class Cart extends BaseController {
  private async productIsAlreadyInCart(data: cartDataType) {
    try {
      const [
        row,
      ]: any = await this.connection!.execute(
        "SELECT id from cart where users_id=? and products_id=?",
        [data.users_id, data.product_id]
      );
      console.log("rows = ", row);
      return row.length > 0;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
  async addProductsIntoCart(data: cartDataType) {
    const isAlreadyInCart = await this.productIsAlreadyInCart(data);
    if (isAlreadyInCart) {
      throw new BadRequestError("Product is already in cart");
    }
    try {
      const [
        row,
      ]: any = await this.connection!.execute(
        "INSERT into cart(users_id,products_id) VALUES (?,?)",
        [data.users_id, data.product_id]
      );
      return row.insertId;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async deleteProductFromCart(data: cartDataType) {
    const isProductAlreadyPresent = await this.productIsAlreadyInCart(data);

    if (!isProductAlreadyPresent) {
      throw new BadRequestError("No Product Is Found");
    }
    try {
      await this.connection!.execute(
        "DELETE from cart where users_id=? and products_id=?",
        [data.users_id, data.product_id]
      );
      return;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}

const cart = new Cart();

export default cart;
