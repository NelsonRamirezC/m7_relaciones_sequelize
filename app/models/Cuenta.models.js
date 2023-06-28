import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database.js";

const Cuenta = sequelize.define(
    "cuentas",
    {
        numeroCuenta: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4,
            },
        },
        tipoCuenta: {
            type: DataTypes.ENUM("cta. cte.", "cta. vista"),
            allowNull: false,
        },
        balance: {
            type: DataTypes.DECIMAL(11, 2), 
            defaultValue: 0,
            allowNull: false,
            validate: {
                min: 0,
                isDecimal: true,
            },
        },
    },
    {
        timestamps: true,
        tableName: "cuentas",
    }
);

export default Cuenta;
