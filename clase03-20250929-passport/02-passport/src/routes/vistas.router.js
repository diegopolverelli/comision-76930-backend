import { Router } from 'express';
import { auth } from '../middleware/auth.js';
export const router=Router()

router.get('/',(req,res)=>{

    res.status(200).render('home')
})

router.get('/perfil', auth, (req,res)=>{

    let nombre=req.user.nombre
    let email=req.user.email

    res.status(200).render('perfil', {
        nombre, email
    })
})

