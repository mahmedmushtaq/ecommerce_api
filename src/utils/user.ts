import { Password } from "../services/password";
import { dbConnection as db } from "../database/connection";
import { BadRequestError } from "../errors";

class User {
  constructor() {}

  async addNewUser(data: { name: string; email: string; password: string }) {
    const hashedPassword = await Password.toHash(data.password);

    try {
      const [
        rows,
      ]: any = await db.connection!.execute(
        "INSERT INTO users(name,email,password) VALUES (?,?,?)",
        [data.name, data.email, hashedPassword]
      );

      return { id: rows.insertId };
    } catch (err) {
      throw new BadRequestError(err);
    }
  }

  async authenticate(data: { email: string; password: string }) {
    const [
      rows,
    ]: any = await db.connection?.execute(
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

    const rowData:any = rows[0];

    // also get account the type by checking into the seller and admin table
    return {
      id: rowData.id,
      email:rowData.email,
      full_name: rowData.name,
      accountType: "user",
    };
  }
}

const user = new User();

export { user };
