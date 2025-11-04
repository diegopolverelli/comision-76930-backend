import { CartsDAO } from "../dao/CartsDAO.js";

export class CartsRepository{
    static cartsDAO=CartsDAO

    static async createCart(){
        return await this.cartsDAO.create()
    }

    static async getCartById(id){
        return await this.cartsDAO.getBy({_id:id})
    }

    static async updateCart(id, cart){
        return await this.cartsDAO.update(id, cart)
    }

}