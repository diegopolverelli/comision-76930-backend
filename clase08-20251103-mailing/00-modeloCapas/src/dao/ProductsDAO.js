import { productosModelo } from "../models/productModel.js";

export class ProductsDAO{
    // constructor(){}

    async get(filtro={}){
        return await productosModelo.find(filtro).lean()
    }

    async getBy(filtro={}){
        return await productosModelo.findOne(filtro).lean()
    }

    async save(product){
        let productoNuevo=await productosModelo.create(product)
        console.log(productoNuevo)
        return productoNuevo.toJSON()
    }

}