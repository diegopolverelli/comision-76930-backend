import express from 'express';
import fs from 'fs'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import passport from 'passport';
import { iniciarPassport } from './config/config.passport.js';
import { passportCall } from './utils.js';
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// paso 2
iniciarPassport()
app.use(passport.initialize())
// app.use(passport.session())   // solo si uso express.sessions

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

app.post('/registro', (req, res) => {
    let { nombre, email, password } = req.body
    if (!nombre || !email || !password) return res.status(400).send({ error: 'Ingrese todos los datos' })

    let usuario = usuarios.find(u => u.email === email)
    if (usuario) return res.status(400).send({ error: `El usuario ${email} ya existe en la DB` })

    let id = 1
    if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

    usuario = {
        id,
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        rol: "user"
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

    res.json({
        usuarioCreado: usuario
    })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body
    if (!email || !password) return res.status(400).send({ error: 'Ingrese email y password' })

    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

    let usuario = usuarios.find(u => u.email === email)
    if (!usuario) return res.status(400).send({ error: `Error credenciales` })

    if (!bcrypt.compareSync(password, usuario.password)) return res.status(400).send({ error: `Error credenciales` })

    // usuario=userModel.findOne({email}).lean()

    // req.session.usuario=usuario
    let token = jwt.sign(usuario, "CoderCoder123", { expiresIn: "1h" })

    res.cookie("cookieToken", token, { httpOnly: true })

    return res.status(200).json({
        msg: `Login exitoso para ${usuario.nombre}`,
        usuarioLogueado: usuario,
    })

})

app.get("/error", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).json({ payload: `Error al autenticar` });
})

// app.get('/usuario', passport.authenticate("current", { session: false, failureRedirect: "/error" }), (req, res) => {
app.get('/usuario', passportCall("current"), (req, res) => {

    // si sale ok el authenticate deja un req.user

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        mensaje: 'Perfil usuario ' + req.user.nombre,
    });
});


// app.get('/protected', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info, status) {
//         if (err) { return next(err) }    // return done(error)
//         if (!user) { return res.redirect('/signin') }  // return done(null, false)
//         res.redirect('/account');   // return done(null, usuario)
//     })(req, res, next);
// });

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
