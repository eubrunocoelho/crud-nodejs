import { Sequelize } from 'sequelize';
import dotenv from "dotenv/config.js";

const
    dbName = process.env.DB_NAME,
    dbUser = process.env.DB_USER,
    dbPassword = process.env.DB_PASSWORD,
    dbHost = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql',
    host: dbHost
});

export default sequelize;