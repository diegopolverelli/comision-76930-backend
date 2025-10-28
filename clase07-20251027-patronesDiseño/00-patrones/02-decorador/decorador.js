
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{
    return a+b
}

console.log(suma(4,5))

const decoraLog=(fn)=>{
    return (...params)=>{   // ... son el op. rest
        console.log(`La función ${fn.name} se ejecuto el ${new Date().toUTCString()}`)

        return fn(...params)   // ... son el op. spread
    }
}

const sumaConLog=decoraLog(suma)

console.log(sumaConLog(6,9))
console.log(suma(4,5))