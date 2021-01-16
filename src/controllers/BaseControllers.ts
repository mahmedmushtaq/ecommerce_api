import { dbConnection as db } from "../database/Connection";
abstract class BaseController {
  protected get connection() {
    return db.connection;
  }
}

export default BaseController;
