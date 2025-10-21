const divMascotas=document.getElementById("mascotas")
const btnMascotas=document.getElementById("btnMascotas")

btnMascotas.addEventListener("click", async(e)=>{

    e.preventDefault()

    try {
        let response=await fetch("http://localhost:3000/api/pets", {
            method: "get"
        })
        if(response.status>=400){
            divMascotas.textContent=response.statusText
            return 
        }
        let data=await response.json()
        divMascotas.textContent=JSON.stringify(data.pets)
        
    } catch (error) {
        divMascotas.textContent=error.message
    }


})