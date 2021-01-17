import { BadRequestError, InternalServerError } from "../../errors";
import BaseController from "../BaseControllers";

class Order extends BaseController {
  async createOrder(data: {
    user_id: number;
    quantity: number;
    product_id: number;
    payment_type?: string;
  }) {
    const defaultType = data.payment_type || "after_shipping";
    const defaultStatus = "pending";

    const [
      payment_details_row,
    ]: any = await this.connection!.execute(
      "INSERT INTO payment_details(payment_type,payment_status) VALUES (?,?)",
      [defaultType, defaultStatus]
    );

    const paymentDetailsID = payment_details_row.insertId;

    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "INSERT INTO orders(quantity,user_id,product_id,payment_details_payment_id) VALUES (?,?,?,?)",
        [data.quantity, data.user_id, data.product_id, paymentDetailsID]
      );

      return rows.insertId;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async updatePaymentStatus(status: string, payment_id: number) {
    try {
      await this.connection!.execute(
        "UPDATE payment_details SET payment_status=? where id=?",
        [status, payment_id]
      );
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async deleteOrder(order_id: number) {
    //first delete payment
    try {
      const [
        record,
      ]: any = await this.connection?.execute(
        "Select payment_details_payment_id from orders where id=?",
        [order_id]
      );

      if (record!.length === 0) {
        throw new BadRequestError("Order is already deleted");
      }

      //@ts-ignore
      const paymentId = record[0].payment_details_payment_id;
      const rows = await this.connection!.execute(
        "DELETE FROM orders where id=?",
        [order_id]
      );

      await this.connection!.execute("DELETE FROM payment_details where id=?", [
        paymentId,
      ]);
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async orderVerify(status: string, orderId: number) {
    try {
      // please check first, user only confirm his/her store order not other
      await this.connection!.execute("UPDATE orders SET status=? where id=?", [
        status,
        orderId,
      ]);
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  //all orders

  async allUnverfiedOrders(userId: number) {
    try {
      const [
        orders,
      ]: any = await this.connection!.execute(
        "SELECT quantity,status,payment_type,payment_status,email,stores.name as store_name, products.product_name from orders left outer join products on products.id = orders.product_id left outer join stores on stores.id=products.store_id left outer join users on users.id=orders.user_id left outer join payment_details on payment_details.id=orders.payment_details_payment_id where status is Null and orders.user_id=?",
        [userId]
      );
      return orders;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async myOrders(userId: number) {
    try {
      const [
        orders,
      ]: any = await this.connection!.execute(
        "SELECT quantity,status,payment_type,payment_status,email,stores.name as store_name, products.product_name from orders left outer join products on products.id = orders.product_id left outer join stores on stores.id=products.store_id left outer join users on users.id=orders.user_id left outer join payment_details on payment_details.id=orders.payment_details_payment_id where user_id=?",
        [userId]
      );
      return orders;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}

const order = new Order();

export default order;
