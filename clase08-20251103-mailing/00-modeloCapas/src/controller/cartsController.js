import { CartsService } from "../services/CartService.js";

export const creatCart=async(req, res)=>{
    try {
        let newCart=await CartsService.createCart()

        res.setHeader('Content-Type','application/json');
        return res.status(201).json({newCart});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`internal server error`})
    }
}

export const addProductsToCart=async(req, res)=>{
    let {cid}=req.params
    let products=req.body

    // faltan validaciones...!!!
    try {
        let updatedCart=await CartsService.addProductsToCart(cid, products)
        
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({updatedCart});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`internal server error`})        
    }
}