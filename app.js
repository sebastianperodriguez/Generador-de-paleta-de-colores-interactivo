console.log("js conectado correctamente");

// Traer elementos desde el HTML
const cantidadColores = document.getElementById("cantidadcolores");
const boton = document.getElementById("generarpaleta");
const PaletaGenerada = document.getElementById("paletacolores");
const tipoCodigo = document.getElementById("tipoCodigo");


// Crear elemento para feedback únicamente desde js
const feedback = document.createElement("div");
feedback.id = "feedback-copiado";
feedback.textContent = "¡Copiado!";
feedback.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #111;
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    display: none;
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
`;
document.body.appendChild(feedback);


// Funciones para rgb a hex
function rgbToHex(r, g, b) {
  return "#" + [r, g, b]
    .map(x => x.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

// Función para rgb a hsl
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l;
  l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 
      ? d / (2 - max - min) 
      : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}


// Función para mostrar feedback
function mostrarFeedback() {
    feedback.style.display = "block";
    setTimeout(() => {
        feedback.style.opacity = "1";
        feedback.style.transform = "translateX(0)";
    }, 10);
    
    // Ocultar después de 2 segundos
    setTimeout(() => {
        feedback.style.opacity = "0";
        feedback.style.transform = "translateX(100%)";
        setTimeout(() => {
            feedback.style.display = "none";
        }, 300);
    }, 2000);
}

// Crear escuchador al botón
boton.addEventListener("click", function () {
    
    // const cantidad = (cantidadColores.value); aquí devuelve un string por eso usamos parseInt
    // para que devuelva un number//
    const cantidad = parseInt(cantidadColores.value);
    console.log(cantidad);
    
    // limpiar la paleta antes de generar una nueva//
    PaletaGenerada.innerHTML = "";
    
    // generar colores aleatorios//
    for (let i = 0; i < cantidad; i++) { 

        // probamos que el bucle funciona//
        console.log("color numero", i);

        // Generar valores aleatorios para el color
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        // Crear el color RGB
        // const color = "rgb(${r}, ${g}, ${b})";//esta línea no funciona porque las comillas son simples, 
        // para que funcione deben ser estas otras comillas (``)//
        const color = `rgb(${r}, ${g}, ${b})`;
        const colorHex = rgbToHex(r, g, b);
        const colorHsl = rgbToHsl(r, g, b);
        console.log("Color generado:", color);

        // Seleccionar el código a mostrar según el tipo seleccionado
        const codigoMostrado = tipoCodigo.value === "hex" ? colorHex : colorHsl;
        
        // Crear el colorDiv
        const colorDiv = document.createElement("div");
        
        colorDiv.style.backgroundColor = color;
        colorDiv.style.color = "White";
        colorDiv.textContent = `${tipoCodigo.value.toUpperCase()}: ${codigoMostrado}`;

        // Opción para copiar el código del tipo seleccionado + FEEDBACK
        colorDiv.addEventListener("click", function(){
            navigator.clipboard.writeText(codigoMostrado); 
            console.log("copiado:", codigoMostrado);
            
            // Mostrar feedback
            mostrarFeedback();
        });

        PaletaGenerada.appendChild(colorDiv);
    }
});
