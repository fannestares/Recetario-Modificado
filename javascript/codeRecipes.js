// Variables globales
let recetas = null;
let recetaActual = 0;
let totalRecetas = 0;

// Elementos del DOM
const vistaCuadricula = document.getElementById('vista-cuadricula');
const vistaDetalle = document.getElementById('vista-detalle');
const tituloReceta = document.getElementById('titulo-receta');
const imagenReceta = document.getElementById('imagen-receta');
const infoDuracion = document.getElementById('info-duracion');
const infoPorciones = document.getElementById('info-porciones');
const listaIngredientes = document.getElementById('lista-ingredientes');
const listaProcedimiento = document.getElementById('lista-procedimiento');
const contenedorDetalle = document.getElementById('contenedor-detalle');

// Cargar las recetas al iniciar
cargarRecetas();

async function cargarRecetas() {
try {
    const respuesta = await fetch('resources/recetas.json');
    recetas = await respuesta.json();
    iniciarApp();
} catch (error) {
    console.log('Error cargando las recetas:', error);
    // Usar datos de ejemplo si hay error
    recetas = {
        "Juane": {
    "Info": {
        "duracion": "1 h 30 min",
        "porciones": "4 personas",
        "dificultad": "Media",
        "categoria": "Plato Principal",
        "calorias": "480 por porción",
        "descripcion": "Plato tradicional de la Amazonía peruana preparado con arroz sazonado, pollo y envuelto en hojas de bijao"
    },
    "Ingredientes": [
        "2 tazas de arroz",
        "4 presas de pollo",
        "2 huevos cocidos",
        "1 cebolla picada",
        "2 dientes de ajo molidos",
        "2 cucharadas de palillo (cúrcuma)",
        "Sal y pimienta al gusto",
        "3 cucharadas de aceite vegetal",
        "Hojas de bijao"
    ],
    "Procedimiento": [
        "Sazonar el pollo con sal y pimienta.",
        "Preparar un aderezo con aceite, cebolla, ajo y palillo.",
        "Agregar el arroz al aderezo y cocinarlo parcialmente.",
        "Pasar las hojas de bijao por el fuego para suavizarlas.",
        "Colocar arroz sobre la hoja, una presa de pollo y huevo.",
        "Cubrir con más arroz y envolver.",
        "Amarrar y hervir por 45 minutos.",
        "Servir caliente."
    ],
    "Imagen": "https://portal.andina.pe/EDPfotografia3/Thumbnail/2022/06/21/000877563W.webp",
    "color": "#C8E6C9"
},
        "Carapulcra": {
    "Info": {
        "duracion": "1 h 30 min",
        "porciones": "4 personas",
        "dificultad": "Media",
        "categoria": "Plato Principal",
        "calorias": "520 por porción",
        "descripcion": "Plato tradicional peruano preparado con papa seca, maní y carne de cerdo, típico de la costa sur"
    },
    "Ingredientes": [
        "400 g de papa seca",
        "400 g de carne de cerdo",
        "1/2 taza de maní tostado y molido",
        "1 cebolla roja picada",
        "2 cucharadas de ají panca molido",
        "1 cucharada de ají mirasol molido",
        "2 dientes de ajo molidos",
        "1/2 taza de chicha de jora",
        "750 ml de caldo de carne",
        "Sal, pimienta y comino al gusto",
        "3 cucharadas de aceite"
    ],
    "Procedimiento": [
        "Remojar la papa seca en agua caliente por 30 minutos y escurrir.",
        "Sazonar la carne con sal, pimienta y comino.",
        "Dorar la carne en una olla con aceite y reservar.",
        "En la misma olla, preparar el aderezo con cebolla, ajo y ajíes.",
        "Agregar la carne, la chicha de jora y dejar reducir.",
        "Incorporar la papa seca, el maní y el caldo caliente.",
        "Cocinar a fuego bajo moviendo constantemente hasta obtener una textura espesa.",
        "Rectificar la sazón y servir caliente."
    ],
    "Imagen": "https://www.comida-peruana.com/base/stock/Recipe/carapulcra/carapulcra_web.jpg.webp",
    "color": "#8D6E63"
}
    };
    iniciarApp();
}
}

function iniciarApp() {
totalRecetas = Object.keys(recetas).length;
mostrarCuadricula();
}

function mostrarCuadricula() {
vistaCuadricula.innerHTML = '';

const nombresRecetas = Object.keys(recetas);

nombresRecetas.forEach((nombre, indice) => {
    const receta = recetas[nombre];
    
    // Crear tarjeta
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta mostrar';
    
    // Imagen
    const imagen = document.createElement('img');
    imagen.src = receta.Imagen;
    imagen.alt = nombre;
    
    // Contenido de la tarjeta
    const contenido = document.createElement('div');
    contenido.className = 'tarjeta-contenido';
    
    // Título
    const titulo = document.createElement('h3');
    titulo.className = 'tarjeta-titulo';
    titulo.textContent = nombre;
    
    // Información
    const info = document.createElement('div');
    info.className = 'tarjeta-info';
    info.innerHTML = `⏱️ ${receta.Info.duracion} &nbsp; 👥 ${receta.Info.porciones}`;
    
    // Descripción
    const descripcion = document.createElement('p');
    descripcion.className = 'tarjeta-descripcion';
    descripcion.textContent = receta.Info.descripcion || 'Receta peruana';
    
    // Evento de clic
    tarjeta.onclick = function() {
        mostrarDetalle(indice);
    };
    
    // Unir todo
    contenido.appendChild(titulo);
    contenido.appendChild(info);
    contenido.appendChild(descripcion);
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(contenido);
    vistaCuadricula.appendChild(tarjeta);
});
}

function mostrarDetalle(indice) {
recetaActual = indice;
actualizarDetalle();

// Cambiar vistas
vistaCuadricula.style.display = 'none';
vistaDetalle.style.display = 'block';
contenedorDetalle.classList.add('mostrar');

// Ir al inicio de la página
window.scrollTo(0, 0);
}

function volverACuadricula() {
vistaDetalle.style.display = 'none';
vistaCuadricula.style.display = 'grid';
}

function recetaAnterior() {
recetaActual--;
if (recetaActual < 0) {
    recetaActual = totalRecetas - 1;
}
actualizarDetalle();
window.scrollTo(0, 0);
}

function recetaSiguiente() {
recetaActual++;
if (recetaActual >= totalRecetas) {
    recetaActual = 0;
}
actualizarDetalle();
window.scrollTo(0, 0);
}

function actualizarDetalle() {
const nombresRecetas = Object.keys(recetas);
const nombre = nombresRecetas[recetaActual];
const receta = recetas[nombre];

// Actualizar título
tituloReceta.textContent = nombre;

// Actualizar imagen
imagenReceta.src = receta.Imagen;
imagenReceta.alt = nombre;

// Actualizar información
infoDuracion.innerHTML = `<strong>⏱️</strong> ${receta.Info.duracion}`;
infoPorciones.innerHTML = `<strong>👥</strong> ${receta.Info.porciones}`;

// Agregar información adicional si existe
let infoExtra = '';
if (receta.Info.dificultad) {
    infoExtra += `<div class="info-item"><strong>⚡ Dificultad: </strong> ${receta.Info.dificultad}</div>`;
}
if (receta.Info.categoria) {
    infoExtra += `<div class="info-item"><strong>📂</strong> ${receta.Info.categoria}</div>`;
}
if (receta.Info.calorias) {
    infoExtra += `<div class="info-item"><strong>🔥 Calorias: </strong> ${receta.Info.calorias}</div>`;
}

// Agregar información adicional al contenedor
if (infoExtra) {
    const contenedorInfo = document.querySelector('.info-receta');
    contenedorInfo.innerHTML = infoDuracion.outerHTML + infoPorciones.outerHTML + infoExtra;
}

// Actualizar ingredientes
listaIngredientes.innerHTML = '';
receta.Ingredientes.forEach(ingrediente => {
    const elemento = document.createElement('li');
    elemento.textContent = ingrediente;
    listaIngredientes.appendChild(elemento);
});

// Actualizar procedimiento
listaProcedimiento.innerHTML = '';
receta.Procedimiento.forEach(paso => {
    const elemento = document.createElement('li');
    elemento.textContent = paso;
    listaProcedimiento.appendChild(elemento);
});

// Cambiar color de fondo si existe
if (receta.color) {
    contenedorDetalle.style.borderLeft = `5px solid ${receta.color}`;
}
}