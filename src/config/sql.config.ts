import { Sequelize } from "@sequelize/core";
import logger from "@/utils/logger.util";

// class PostgresSequelize {
//   private static instance: PostgresSequelize;
//
//   protected dialect: Dialect = "postgres";
//   protected host: string = "localhost";
//   protected port: number = 5432;
//   protected dbName: string = "postgres";
//   protected username: string = "postgres";
//   protected password: string = "postgres";
//
//   constructor(dialect?: Dialect, host?: string, port?: number, dbName?: string, username?: string, password?: string) {
//     this.dialect = dialect || this.dialect;
//     this.host = host || this.host;
//     this.port = port || this.port;
//     this.dbName = dbName || this.dbName;
//     this.username = username || this.username;
//     this.password = password || this.password;
//   }
//
//   private static getInstance(): PostgresSequelize {
//     if (!PostgresSequelize.instance) {
//       PostgresSequelize.instance = new PostgresSequelize();
//     }
//     return PostgresSequelize.instance;
//   }
//
//   // test connect with sequelize
//   public static async connect(): Promise<void> {
//     const instance = PostgresSequelize.getInstance();
//     const sequelize = new Sequelize( instance.dbName, instance.username, instance.password, {
//       dialect: instance.dialect,
//       host: instance.host,
//       port: instance.port,
//     });
//     try {
//       await sequelize.authenticate();
//       console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
//   }
// }

export const sequelize = new Sequelize("postgres", "postgres", "5464", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
  define: {
    timestamps: true,
    underscored: true
  }
});

export const postgresTestConnectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info("Postgres connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
};