import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    "m7_d6_ejemplo_sequelize",
    "node",
    "123456",
    {
        host: "localhost",
        dialect: "postgres",
    }
);

export default sequelize;
