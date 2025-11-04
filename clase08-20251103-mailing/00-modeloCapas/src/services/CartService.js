import { ProductsDAO } from "../dao/ProductsDAO.js";
import { ticketModel } from "../models/ticketsModel.js";
import { CartsRepository } from "../repository/CartsRepository.js";
import { ProductsRepository } from "../repository/ProductsRepository.js";

export class CartsService{
    static cartRepository=CartsRepository
    static productRepository=new ProductsRepository(ProductsDAO)

    static async createCart(){
        return await this.cartRepository.createCart()
    }

    static async updateCart(id, cart){
        return await this.cartRepository.updateCart(id, cart)
    }

    static async addProductsToCart(cid, products=[]){
        if(!Array.isArray(products)){
            throw new Error(`Los productos deben ser de tipo array`)
        }

        console.log(products)

        let errores=[]
        for(let i=0; i<products.length; i++){
            let producto=await this.productRepository.getProductById(products[i].productID)
            if(!producto){
                errores.push(`No existen productos con id: ${products[i].productID}`)
            }
            console.log(producto)
        }
        if(errores.length>0){
            throw new Error(`Problemas en los productos: ${JSON.stringify(errores)}`)
        }

        let cart=await this.cartRepository.getCartById(cid)
        if(!cart){
            throw new Error(`No existe el cart con id ${cid}`)
        }

        cart.products=products
        return await this.cartRepository.updateCart(cid, cart)
    }

    static async purchaseCart(cid){
        let cart=await this.cartRepository.getCartById(cid)
        if(!cart){
            throw new Error(`No existe el cart con id ${cid}`)
        }
        
        let conStock=[]
        let sinStock=[]
        let total=0
        for(let i=0; i<cart.products.length; i++){
            console.log(cart.products[i].productID._id)
            let producto=await this.productRepository.getProductById(cart.products[i].productID._id)
            if(!producto || producto.stock<cart.products[i].quantity){
                sinStock.push(cart.products[i])
            }else{
                // crear update en DAO products y repository, y actualizar stock en producto
                conStock.push({
                    ...cart.products[i].productID, 
                    quantity: cart.products[i].quantity, 
                    subtotal: cart.products[i].quantity * cart.products[i].productID.price
                })
                total+=cart.products[i].quantity * cart.products[i].productID.price
            }
        }

        if(conStock.length==0){
            throw new Error(`No existen productos en condiciones de ser comprados`)
        }

        let ticket = await ticketModel.create({
            nroTicket: Date.now(), 
            fecha: new Date().toUTCString(), 
            total, 
            detalle: conStock 
        })

        return ticket.toJSON()
    }
}