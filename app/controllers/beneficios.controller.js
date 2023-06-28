import Usuario from "../models/Usuario.models.js";
import Beneficio from "../models/Beneficio.models.js";

export const getBeneficios = async (req, res) => {
    try {
        const beneficios = await Beneficio.findAll({
            include: {
                model: Usuario,
                as: "beneficiarios",
                through: { attributes: ["estado"] },
                attributes: ["id", "nombre", "email"]
            },
        });
        res.send({ code: 200, data: beneficios});
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: "Error al consultar los beneficios.",
        });
    }
};

export const addBeneficios = async (req, res) => {
    try {
        let { nombre, tipoBeneficio, descripcion, descuento } = req.body;
        
        const nuevoBeneficio = await Beneficio.create({
            nombre,
            tipoBeneficio,
            descripcion,
            descuento,
        });

        res.status(201).send({
            code: 201,
            message: `Beneficio con ID: ${nuevoBeneficio.id} creado con éxito.`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: error.message });
    }
};

export const addAsociacion = async (req, res) => {

    try {
        let { usuarioId, beneficioId } = req.body;

        let usuario = await Usuario.findByPk(usuarioId);
        let beneficio = await Beneficio.findByPk(beneficioId);

        if (!usuario) {
            return res.status(400).send({
                code: 400,
                message: `El usuario al que intenta vincular al beneficio no existe,  (ID USUARIO: ${usuarioId})`,
            });
        }

        if (!beneficio) {
            return res.status(400).send({
                code: 400,
                message: `El beneficio al que intenta vincular al usuario ${usuario.nombre} no existe, (ID BENEFICIO: ${beneficioId})`,
            });
        }

        await usuario.addBeneficio(beneficio, {
            through: {
                estado: true
            }
        });

        res.status(201).send({
            code: 201,
            message: `Usuario: ${usuario.nombre}, vinculado al beneficio ${beneficio.nombre}`,
        });
        
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: `Ha ocurrido un error al intentar vincular el beneficio al usuario.`,
        });
    }
}
