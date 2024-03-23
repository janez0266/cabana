import pkgSequelize from "sequelize";
const { Sequelize } = pkgSequelize;

export class PGConnection {
  constructor(host, port, database, user, password) {
    this.host = host;
    this.port = port;
    this.database = database;
    this.user = user;
    this.password = password;

    this.sequelize = new Sequelize(database, user, password, {
      host: host,
      port: port,
      dialect: "postgres",
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Connected to PostgreSQL database");
    } catch (err) {
      console.error("Error connecting to PostgreSQL database:", err);
    }
  }
}
