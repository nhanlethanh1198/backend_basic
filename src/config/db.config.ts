import { connect } from "mongoose";
import logger from "@/utils/logger.util";

const mongoConnectDB = async (URL: string): Promise<void> => {
    try {
        const connection: any = await connect(URL, {});
        logger.info(`Mongo DB is connected to: ${connection.connection.host}`);
    } catch (err: Error | any) {
        logger.error(`An error occurred\n\r\n\r${err}`);
    }
};

export default mongoConnectDB;