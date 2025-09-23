import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { generaHash } from '../utils.js';
export const router=Router()

router.post('/register',async(req,res)=>{
    let {nombre, email, password}=req.body
    // validaciones
    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre email password son requeridos`})
    }

    try {

        password=generaHash(password)

        let nuevoUsuario=await UsuariosManagerMongo.create({nombre, email, password})
        
        res.setHeader('Content-Type','application/json')
        res.status(200).json({message:`Registro exitoso`, nuevoUsuario})
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }
    

})