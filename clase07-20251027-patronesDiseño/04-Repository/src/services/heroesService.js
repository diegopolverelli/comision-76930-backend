import { heroesRepository } from "../repository/heroes.repository.js"

class HeroesService{
    constructor(dao){
        this.heroesRepository=dao 
    }

    async getHeroes(){
        return await this.heroesRepository.getHeroes()
    }
}

export const heroesService=new HeroesService(heroesRepository)