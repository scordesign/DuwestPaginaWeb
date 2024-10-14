// script.js

const abrirGaleria = document.getElementById('abrirGaleria');
const galeria = document.getElementById('galeria');
const cerrarGaleria = document.getElementById('cerrarGaleria');
const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');
const imagenes = [
  "img/Foto conoce más de duwest 1.JPG",
  "img/Foto conoce más de Duwest 2.png",
  "img/Foto Novedades y lanzamiento 4.png",
  "img/Foto Novedades y lanzamiento 1.png",
  "img/Foto Novedades y lanzamientos 2.png",
];
let imagenActual = 0;

abrirGaleria.addEventListener('click', () => {
  galeria.style.display = 'block';
  mostrarImagen(imagenActual);
});

cerrarGaleria.addEventListener('click', () => {
  galeria.style.display = 'none';
});

anterior.addEventListener('click', () => {
  imagenActual--;
  if (imagenActual < 0) {
    imagenActual = imagenes.length - 1;
  }
  mostrarImagen(imagenActual);
});

siguiente.addEventListener('click', () => {
  imagenActual++;
  if (imagenActual >= imagenes.length) {
    imagenActual = 0;
  }
  mostrarImagen(imagenActual);
});

function mostrarImagen(indice) {
  const imagen = document.querySelector('.imagen-activa');
  imagen.src = imagenes[indice];
}