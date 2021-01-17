import { Password } from "../../services/password";
import { BadRequestError, InternalServerError } from "../../errors";
import { userType } from "./UserType";
import BaseController from "../BaseControllers";

class User extends BaseController {
  constructor() {
    super();
  }

  async addNewUser(data: { name: string; email: string; password: string }) {
    const hashedPassword = await Password.toHash(data.password);

    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "INSERT INTO users(name,email,password) VALUES (?,?,?)",
        [data.name, data.email, hashedPassword]
      );

      return { id: rows.insertId };
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async authenticate(data: { email: string; password: string }) {
    const [
      rows,
    ]: any = await this.connection!.execute(
      "Select id,email, password,name from users where email=?",
      [data.email]
    );
    if (!rows.length) {
      return undefined;
    }
    const isValidPassword = await Password.compare(
      rows[0].password,
      data.password
    );

    if (!isValidPassword) {
      return undefined;
    }

    const rowData: any = rows[0];
    const accountType = await userType.type(rowData.id);

    // also get account the type by checking into the seller and admin table
    return {
      id: rowData.id,
      email: rowData.email,
      full_name: rowData.name,
      accountType,
    };
  }

  async updateName(userId: number, name: string) {
    try {
      await this.connection!.execute("Update users set name=? where id=?", [
        name,
        userId,
      ]);
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}

const user = new User();

export { user };
