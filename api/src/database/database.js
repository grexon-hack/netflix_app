import Sequelize from 'sequelize';



export const sequelize = new Sequelize('netflix', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});


