import express from 'express';
import cookieParser from "cookie-parser"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("password1234"))
app.use(express.static('./src/public'))

app.get('/',(req,res)=>{
    console.log(req.headers)

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/set',(req,res)=>{
    let dato={
        nombre:"Juan", 
        theme: "dark", 
        "font-size": 32 
    }


    res.cookie("cookie01", dato, )
    res.cookie("cookie02conMaxAge", dato, {maxAge: 1000 * 10})
    res.cookie("cookie03conExpires", dato, {expires: new Date(2026, 11, 18)})
    // res.cookie("cookie09conExpires", dato, {expires: new Date(2026, 11, 18)})
    res.cookie("cookie04signed", dato, {signed: true, expires: new Date(2025, 11, 18)})
    res.setHeader('Content-Type','text/plain');
    res.status(200).send({message:"Cookies seteadas!"});
})

app.get("/get", (req, res)=>{

    let cookies=req.cookies
    let signedCookies=req.signedCookies


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:{
        cookies, 
        signedCookies
    }});
})

app.get("/del", async(req, res)=>{

    // let productos=await ProductManager.get()

    // res.clearCookie("cookie01")
    let cookies=Object.keys(req.cookies)
    cookies.forEach(c=>res.clearCookie(c))

    cookies=Object.keys(req.signedCookies)
    cookies.forEach(c=>res.clearCookie(c))

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies eliminadas"});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
