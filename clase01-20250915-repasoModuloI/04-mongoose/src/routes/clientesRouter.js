import { Router } from 'express';
import { ClientesManager } from '../dao/ClientsManager.js';
export const router=Router()

router.get('/',async(req,res)=>{

    try {
        
        let clientes=await ClientesManager.get()
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({clientes})
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }

})