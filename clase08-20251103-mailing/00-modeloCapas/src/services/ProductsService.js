import { ProductsDAO } from "../dao/ProductsDAO.js"
import { ProductsRepository } from "../repository/ProductsRepository.js"

class ProductsService{
    constructor(productRepository, ){
        this.productsRepository=productRepository
    }

    async getProducts(filtro={}){
        return await this.productsRepository.getProducts(filtro)
    }

    async createProduct(product){
        return await this.productsRepository.createProduct(product)
    }

}

export const productsService=new ProductsService(new ProductsRepository(ProductsDAO))