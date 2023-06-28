import Usuario from "./Usuario.models.js";
import Cuenta from "./Cuenta.models.js";
import Beneficio from "./Beneficio.models.js";

//relación 1 a muchos entre Usuario - Cuenta
Usuario.hasMany(Cuenta, {
    as: "cuentas",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
});
Cuenta.belongsTo(Usuario, {
    as: "usuario",
});


//relación muchuchos a muchos (N:M) - Beneficio - Usuario

Usuario.belongsToMany(Beneficio, {
    as: "beneficios",
    through: "beneficioUsuario"
});

Beneficio.belongsToMany(Usuario, {
    as: "beneficiarios",
    through: "beneficioUsuario",
});