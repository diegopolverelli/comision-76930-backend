const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnLogin=document.getElementById("btnLogin")
const divMensaje=document.getElementById("mensaje")

btnLogin.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value.trim()
    let password=inputPassword.value.trim()
    if(!email || !password){
        alert("Complete los datos")
        return 
    }

    let body={
        email, 
        password
    }

    let response=await fetch("/api/sessions/login", {
        method:"post", 
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(body)
    })
    let datos=await response.json()
    if(response.status>=400){
        divMensaje.textContent=datos.error
        return 
    }

    window.location.href="/perfil"

})