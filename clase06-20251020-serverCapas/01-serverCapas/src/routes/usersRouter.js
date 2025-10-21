import { Router } from 'express';
import { createUser, getUsers } from '../controller/users.controller.js';
export const router=Router()

router.get('/', getUsers)
router.post("/", createUser)