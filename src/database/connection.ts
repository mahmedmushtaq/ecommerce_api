import mysql, { Connection as MySqlConnection } from "mysql2/promise";
export class Connection {
  // private
  private _con?: MySqlConnection;
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      this._con = await mysql.createConnection({
        host: process.env!.DB_URL,
        user: process.env!.DB_USER,
        password: process.env!.DB_PASSWORD,
        database: process.env!.DB_NAME,
      });
      console.log("connected to mysql");
    } catch (e) {
      console.error(e);
    }
  }

  async connectMySql() {}

  get connection() {
    return this._con;
  }
}

const dbConnection = new Connection();
export { dbConnection };
