import mysql, { Connection as MySqlConnection } from "mysql2/promise";
class Connection {
  // private
  private _con?: MySqlConnection;
  constructor() {}

  async connect() {
    try {
      this._con = await mysql.createConnection({
        host: process.env!.DB_URL,
        user: process.env!.DB_USER,
        password: process.env!.DB_PASSWORD,
        database: process.env!.DB_NAME,
      });
    } catch (e) {
      console.error(e);
    }
  }

  get connection() {
    return this._con;
  }
}

export const dbConnection = new Connection();

const connection = dbConnection.connect;
export default connection;
