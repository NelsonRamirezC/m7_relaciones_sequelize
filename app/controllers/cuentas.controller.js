import Cuenta from "../models/Cuenta.models.js";
import Usuario from "../models/Usuario.models.js";

export const getCuentas = async (req, res) => {
    try {
        const cuentas = await Cuenta.findAll({
            include: {
                model: Usuario,
                as: "usuario",
                attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            },
        });
        res.send({ code: 200, data: cuentas });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: "Error al consultar las cuentas.",
        });
    }
};
export const addCuentas = async (req, res) => {
    try {
        let { tipoCuenta, balance, usuarioId } = req.body;

        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(400).send({
                code: 400,
                message: `El usuario al que intenta vincular a la cuenta no existe (ID USUARIO: ${usuarioId})`,
            });
        }

        const nuevaCuenta = await Cuenta.create({
            tipoCuenta,
            balance,
        });

        await usuario.addCuentas(nuevaCuenta);

        res.status(201).send({
            code: 201,
            message: `Cuenta N° ${nuevaCuenta.numeroCuenta} creado con éxito.`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: error.message });
    }
};