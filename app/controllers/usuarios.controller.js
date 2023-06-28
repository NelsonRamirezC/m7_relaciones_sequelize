import Usuario from "../models/Usuario.models.js";
import Cuenta from "../models/Cuenta.models.js";
import Beneficio from "../models/Beneficio.models.js";

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            include: [
                {
                    model: Cuenta,
                    as: "cuentas",
                    attributes: {
                        exclude: ["usuarioId", "createdAt", "updatedAt"],
                    },
                },
                {
                    model: Beneficio,
                    as: "beneficios",
                    through: { attributes: ["estado"] },
                },
            ],

            attributes: { exclude: ["password"] },
        });
        res.send({ code: 200, data: usuarios });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: "Error al consultar los usuarios.",
        });
    }
};

export const addUsuarios = async (req, res) => {
    try {
        let { nombre, email, password } = req.body;

        /* const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            password,
        }); */

        const [usuario, created] = await Usuario.findOrCreate({
            where: { email },
            defaults: {
                nombre,
                email,
                password,
            },
        });

        if (!created) {
            return res.status(400).send({code: 400, message: `El usuario que intenta crear con email (${usuario.email}) ya existe.`})
        }

        res.status(201).send({
            code: 201,
            message: `Usuario ${usuario.nombre}, con ID: ${usuario.id} creado con éxito.`,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: error.message });
    }
};

export const editUsuarios = async (req, res) => {
    try {
        let id = req.params.id;
        let { nombre, email, password } = req.body;
        let usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res
                .status(404)
                .send({ code: 404, message: "Usuario no encontrado." });
        }

        await usuario.update(
            { nombre, email, password },
            {
                where: {
                    id,
                },
            }
        );

        res.status(201).send({
            code: 201,
            message: `Usuario ${usuario.nombre} se actualizó con éxito.`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: error.message });
    }
};

export const deleteUsuarios = async (req, res) => {
    try {
        let id = req.params.id;
        let usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res
                .status(404)
                .send({ code: 404, message: "Usuario no encontrado." });
        }

        let nombre = usuario.nombre;
        await usuario.destroy();

        res.status(200).send({
            code: 200,
            message: `Usuario ${nombre} ha sido eliminado con éxito.`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: error.message });
    }
};


export const getUsuariosByEmail = async (req, res) => {
    try {
        let email = req.params.email;
        console.log(email)

        let usuario = await Usuario.findOne({
            where: { email },
            attributes: ['id', 'nombre', 'email']
        })

        console.log(usuario);

        if (!usuario) {
            return res
                .status(404)
                .send({ code: 404, message: "Usuario no encontrado." });
        }

        res.status(200).send({
            code: 200,
            data: usuario,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: error.message });
    }
};