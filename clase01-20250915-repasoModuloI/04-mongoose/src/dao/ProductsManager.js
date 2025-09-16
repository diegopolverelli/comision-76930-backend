import { productos } from "../data/products.js";

export class ProductsManager{

    static async get(){
        let respuesta=productos.map(p=>{
            return {
                ...p,
                title: p.title.toUpperCase()
            }
        })
        return respuesta
    }

    static async create(product={}){  // {color:"verde", name:"pantalon", price:1000}
        let id=1
        if(productos.length>0){
            id=Math.max(...productos.map(d=>d.id))+1
        }

        let nuevoProducto={
            id, 
            // color: product.color, 
            // name: product.name,
            ...product   // los ... son aquí el operador spread 
        }

        productos.push(nuevoProducto)

        return nuevoProducto
        
    }
}