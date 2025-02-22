let index = 0;
const intervalo = 8000;

function mostrarImagen() {
const imagenes = document.querySelectorAll('.imagen');
const carrousel = document.querySelector('.carrousel-imagenes');

if (index >= imagenes.length) {
      index = 0;
}

carrousel.style.transform = `translateX(-${index * 100}%)`;

index++;
}

setInterval(mostrarImagen, intervalo);