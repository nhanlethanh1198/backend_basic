import { InstanceUpdateOptions, UpdateOptions } from '@sequelize/core'
import { Sequelize } from "@sequelize/core";
import logger from "@/utils/logger.util";

export const sequelize = new Sequelize("postgres", "postgres", "5464", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
  define: {
    timestamps: true,
    underscored: true,
    paranoid: true,
    hooks: {
      beforeUpdate: function(instance: any, options: InstanceUpdateOptions) {
        instance.updatedAt = new Date()
      },
      beforeBulkUpdate: function(options: UpdateOptions) {
        options.individualHooks = true;
      }
    }
  },
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