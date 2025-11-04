import { CartsService } from "../services/CartService.js";
import { productsService } from "../services/ProductsService.js"

export const getProductos=async(req, res)=>{
    try {
        let productos=await productsService.getProducts()

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({productos});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`internal server error`})
    }

}

export const crearProducto=async(req,res)=>{
    let {title, price, stock}=req.body
    if(!title || !price || !stock){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete title, stock, y price`})
    }
    try {
        let producto = await productsService.createProduct({title, price, stock})
        
        res.setHeader('Content-Type','application/json')
        res.status(201).json({producto})
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`internal server error`})
    }
}

export const comprarCart=async(req, res)=>{
    let {cid}=req.params
    // validaciones...!!!
    try {
        let purchasedCart=await CartsService.purchaseCart(cid)

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({purchasedCart});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`internal server error`})
    }
}

