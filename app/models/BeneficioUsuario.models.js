import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const BeneficioUsuario = sequelize.define(
    "beneficioUsuarios",
    {
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        timestamps: false,
        tableName: "beneficioUsuarios",
    }
);


export default BeneficioUsuario;