import Sequelize from 'sequelize';
import dotenv from 'dotenv';

const { 
    REACT_APP_DB_ACCOUNT, 
    REACT_APP_DB_PASSWORD, 
    REACT_APP_HOST 
} = dotenv.config().parsed;

export const sequelize = new Sequelize(
    'netflix', 
    REACT_APP_DB_ACCOUNT, 
    REACT_APP_DB_PASSWORD, 
    {
    host: REACT_APP_HOST,
    dialect: 'postgres',
    logging: false
});


