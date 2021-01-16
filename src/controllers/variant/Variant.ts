import { InternalServerError } from "../../errors";
import BaseController from "../BaseControllers";

class Variant extends BaseController {
  async createVariant(data: { name: string; description: string }) {
    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "INSERT into variant(name,description) Values(?,?)",
        [data.name, data.description]
      );
      return rows.insertId;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}

const variant = new Variant();

export default variant;
