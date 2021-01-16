import BaseController from "../BaseControllers";
import { BadRequestError, InternalServerError } from "../../errors";

class UserType extends BaseController {
  // admin,seller
  private async isAlreadyAnAdmin(userId: number) {
    const [
      rows,
    ]: any = await this.connection!.execute(
      "select id from admins where users_id=?",
      [userId]
    );

    return rows.length > 0;
  }

  private async isAlreadySeller(userId: number) {
    const [
      sellers,
    ]: any = await this.connection!.execute(
      "select id from sellers where users_id=?",
      [userId]
    );

    return sellers.length > 0;
  }

  private async isUserPresent(userId: number) {
    try {
      const [rows]: any = await this.connection!.execute(
        `select id from users where id=${userId}`
      );
      return rows.length > 0;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  private async validateUser(userId: number) {
    // check user is not already either admin or seller
    const isUserPresent = await this.isUserPresent(userId);
    const isAlreadySeller = await this.isAlreadySeller(userId);
    const isAlreadyAnAdmin = await this.isAlreadyAnAdmin(userId);
    if (!isUserPresent) {
      throw new BadRequestError("No User Record is present");
    }
    if (isAlreadyAnAdmin) {
      throw new BadRequestError("You are already an admin");
    }
    if (isAlreadySeller) {
      return new BadRequestError("You are already a seller");
    }
  }

  async makeAdmin(userId: number) {
    await this.validateUser(userId);
    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "INSERT into admins(users_id) VALUES (?)",
        [userId]
      );

      return rows.insertId;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async makeSeller(userId: number) {
    await this.validateUser(userId);
    // default is the 7 days
    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "INSERT into sellers(subscription,end_limit,users_id) VALUES (now(),7,?)",
        [userId]
      );

      return rows.insertId;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async type(userId: number) {
    let accountType = "user";
    let isAdmin = await this.isAlreadyAnAdmin(userId);
    if (!isAdmin) {
      const isSeller = await this.isAlreadySeller(userId);
      return isSeller ? "seller" : "user";
    }

    return isAdmin ? "admin" : accountType;
  }
}

const userType = new UserType();
export { userType };
