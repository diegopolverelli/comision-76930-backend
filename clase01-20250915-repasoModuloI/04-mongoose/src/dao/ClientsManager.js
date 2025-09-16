import { clientesModelo } from "./models/clientesModelo.js";

export class ClientesManager{
    static async get(){
        return await clientesModelo.find()
    }

    // async getClientes(){
    //     return await clientesModelo.get()
    // }

    static async create(cliente){
        return await clientesModelo.create(cliente)
    }
}

// ClientesManager.get()
// let clientesManager=new ClientesManager()
// clientesManager.getClientes()