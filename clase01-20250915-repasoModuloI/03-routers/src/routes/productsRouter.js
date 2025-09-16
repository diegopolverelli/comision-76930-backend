import { Router } from 'express';
import { ProductsManager } from '../dao/ProductsManager.js';
export const router=Router()

router.get('/',async(req,res)=>{
    try {
        let productos=await ProductsManager.get()
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({productos})
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }
})

router.post('/', async(req,res)=>{

    try {
        let {title, descrip, price}=req.body
        if(!title || !descrip || !price){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`title, descrip, price son requeridos`})
        }
    
        let producto=await ProductsManager.create({title, descrip, price})
    
        res.setHeader('Content-Type','application/json')
        res.status(201).json({message: `Producto creado!`, producto})
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }

})