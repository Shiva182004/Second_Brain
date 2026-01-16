import { Sequelize } from 'sequelize-typescript';
import configJson from '../config/config.json' with { type: "json" };

const env = process.env.NODE_ENV || 'development';
const config = (configJson as any)[env];

export const sequelize = new Sequelize(config.database, config.username, config.password, config);
export { Sequelize };