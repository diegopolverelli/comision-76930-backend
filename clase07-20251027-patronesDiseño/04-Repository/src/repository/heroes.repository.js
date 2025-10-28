import { MemoryHeroesDAO } from "../dao/memoryHeroesDAO.js"

export class HeroesRepository{
    constructor(dao){
        this.dao=new dao()
    }

    async getHeroes(){
        return await this.dao.get()
    }
}

export const heroesRepository=new HeroesRepository(MemoryHeroesDAO)