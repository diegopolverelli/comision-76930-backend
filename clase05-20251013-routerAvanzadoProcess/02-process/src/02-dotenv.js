// node --env-file ./.env ./src/02-dotenv.js

// process.loadEnvFile("./.env")   // version v20.12.0

// import dotenv from "dotenv"
// dotenv.config({
//     path: "./.env",
//     quiet: true, 
//     override: true
// })

// console.log(process.env.PORT)
// console.log(process.env.MONGO_URL)
// console.log(process.env.PRUEBA_PORT)
// console.log(process.env.PRUEBA_SECRET)

import express from 'express';
import { config } from './config/config.js';
import mongoose from "mongoose"
const PORT=config.general.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


try {
    await mongoose.connect(
        config.database.MONGO_URL, 
        {dbName: config.database.DB_NAME}
    )
    console.log(`DB ${config.database.DB_NAME} online...!!!`)
} catch (error) {
    console.log(`Error al conectar a DB: ${error.message}`)
}