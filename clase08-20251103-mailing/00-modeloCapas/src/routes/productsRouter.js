import { Router } from 'express';
import { crearProducto, getProductos } from '../controller/productController.js';
export const router=Router()

router.get("/", getProductos)
router.post('/', crearProducto)