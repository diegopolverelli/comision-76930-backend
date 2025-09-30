import { Router } from 'express';
import passport from 'passport';
export const router=Router()

router.get("/error", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`Error al autenticar`})
})

router.get('/github', passport.authenticate("github", {failureRedirect:"/api/sessions/error"}))
router.get(
    '/callbackGithub', 
    passport.authenticate("github", {failureRedirect:"/api/sessions/error"}), 
    (req, res)=>{

        req.session.usuario=req.user

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Login exitoso!`, usuario: req.user});
    }
)