import { Router } from 'express';
import { Singleton } from '../config/database.js';
export const router=Router()

router.get('/',(req,res)=>{

    Singleton.conectarDB(
        "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        "comisPruebas"
    )

    let mascotas="mascotas"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({mascotas})
})