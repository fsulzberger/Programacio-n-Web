// function name(params){}

// function nombre (parametros){}

function sumar(){
    console.log(1+2)
}

function sumar_con_parametros(a,b){
    console.log(a+b)
}
sumar_con_parametros


// el console.log no devuelve el dato
function saludar_con_parametros(nombre){
    return("Hola "+ nombre)
}

saludar_con_parametros("Esteban")

function consologear(unResultado){
    console.log(unResultado)
}

consologear(saludar_con_parametros("Esteban"))