import { PetsMemoryDAO } from "../dao/petsDao.js"

class PetsService{
    constructor(dao){
        this.dao=dao
    }

    async getPets(){
        return await this.dao.get()
    }

    async createPet(pet){
        return await this.dao.save(pet)
    }
}

export const petsService=new PetsService(PetsMemoryDAO)