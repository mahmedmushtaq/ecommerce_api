import { InternalServerError } from "../../errors";
import BaseController from "../BaseControllers";

class Category extends BaseController {
  async createCategory(name: string) {
    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "INSERT INTO category(name) values(?)",
        [name]
      );
      return rows.insertId;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}

const category = new Category();

export { category };
