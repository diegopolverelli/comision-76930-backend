import { Router } from 'express';
import { addProductsToCart, creatCart } from '../controller/cartsController.js';
import { comprarCart } from '../controller/productController.js';
export const router=Router()

router.post('/', creatCart)
router.post("/addProducts/:cid", addProductsToCart)
router.post("/:cid/purchase", comprarCart)