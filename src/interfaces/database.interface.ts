export interface IPostgresConfig {
  url: string;
  dialect: string;
  host: string;
  port?: number;
  username: string;
  password: string;
  logging?: boolean;

}

export interface IMongoConfig {
  url: string;
}

export interface IDBConfig {
  postgres: IPostgresConfig;
  mongo: IMongoConfig;
}