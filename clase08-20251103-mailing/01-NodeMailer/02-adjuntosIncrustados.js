import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        service: "gmail", 
        port: 587, 
        auth:{
            user: "diegopolverelli@gmail.com",
            pass: "contraseña de app de gmail",
        }
    }
)

const enviarMail=()=>{
    return transporter.sendMail({
        from: "Diego Polverelli diegopolverelli@gmail.com",
        to: "diegopolverelli@hotmail.com, diepol@yahoo.com", 
        subject: "Prueba mail adjuntos incrustados...",
        // text: "prueba...",
        html: `<h2 style="color:red;">Prueba mensaje con adjuntos incrustados</h2>
<br>
<p>Prueba de mail adjuntos...!!!</p>
<a href="https://plataforma-login.coderhouse.com/"><img src="cid:image01" width="300"></a>
<img src="cid:image01" width="300">
<img src="cid:image02" width="300">
<img src="cid:image03" width="300">
        `,
        attachments: [
            {
                path: "./images/diego10.jpg", 
                filename: "Diego01.jpg",
                cid: "image01",
            },
            {
                path: "./images/lio.jpg", 
                filename: "lio01.jpg",
                cid: "image02",
            },
            {
                path: "./images/lio2.jpg", 
                filename: "lio02.jpg",
                cid: "image03",
            },
        ]
    })
}

let response=await enviarMail()
if(response.rejected.length>0){
    console.log(`Error en el envío del mail`)
}else{
    console.log("Mail enviado con éxito...!!!")
}