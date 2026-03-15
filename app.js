
//probar que el js está conectado//
console.log("js conectado correctamente");

//trer elementos desde el HTML

const cantidadColores = document.getElementById("cantidadcolores");
const boton = document.getElementById("generarpaleta");
const PaletaGenerada = document.getElementById("paletacolores");

//crear escuchador al botón

boton.addEventListener("click", function () {
    
    //const cantidad = (cantidadColores.value); aquí devuelve un string por eso usamos parseInt
    // para que devuelva un number//
    const cantidad = parseInt(cantidadColores.value);
    console.log(cantidad);
    
    //limpiar la paleta antes de generar una nueva//
    PaletaGenerada.innerHTML = "";
    
    //generar colores aleatorios//
    for (let i=0; i < cantidad; i++)

        //probamos que el bucle funciona//
        console.log("color numero", i);

         // Generar valores aleatorios para el color
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        // Crear el color RGB
        //const color = "rgb(${r}, ${g}, ${b})";//esta línea no funciona porque las comillas son simples, 
        // para que funcione deben ser estas otras comillas (``)//

        const color = `rgb(${r}, ${g}, ${b})`;


  console.log("Color generado:", color);
  

});
