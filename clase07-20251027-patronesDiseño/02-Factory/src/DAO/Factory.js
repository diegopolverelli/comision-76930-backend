import { config } from "../config/config.js";
import mongoose from "mongoose";


export let DAO

switch (config.PERSISTENCE) {
    case "MONGO":
        try {
            await mongoose.connect(
                config.MONGO_URL, 
                {dbName: config.DB_NAME}
            )
            console.log(`DB online!`)
        } catch (error) {
            console.log(`Error al conectar a DB... ${error.message}`)
        }

        //import fs from "fs"
        DAO=(await import("./usuariosMongoDAO.js")).usuariosMongoDAO

        break;
    case "FS":
        const fsDAO=await import("./usuariosFsDAO.js")
        DAO=fsDAO.usuariosFsDAO

        break;

    default:
        throw new Error(`Valor de PERSISTENCE no establecido o con errores`)
        // break;
}