import sequelize from "./app/database/database.js";
import app from "./app/app.js";

//importar asociaciones
import "./app/models/asociaciones.js";

const main = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true, alter: true });
        let PORT = 3000;
        app.listen(PORT, () =>
            console.log("Servidor escuchando en http://localhost:" + PORT)
        );
    } catch (error) {
        console.log("Ha ocurrido un error: ", error);
    }
};
main();
