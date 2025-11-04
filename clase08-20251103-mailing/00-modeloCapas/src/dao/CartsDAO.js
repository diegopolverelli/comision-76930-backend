import { cartModel } from "../models/cartsModel.js";

export class CartsDAO{
    static async getBy(filtro={}){
        let cart = await cartModel.findOne(filtro).populate("products.productID").lean()
        console.log("DAO", cart)
        return cart
    }

    static async create(){
        let nuevoCart=await cartModel.create({products:[]})
        return nuevoCart.toJSON()
    }

    static async update(id, cart){
        return await cartModel.findByIdAndUpdate(id, cart, {new: true}).populate("products.productID").lean()
    }
}