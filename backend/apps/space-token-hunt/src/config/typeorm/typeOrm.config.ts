import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  synchronize: false,
  logging: true,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
};

export default new DataSource({
  ...dataSourceOptions,
  migrations: ['./migrations/*.ts'],
});
