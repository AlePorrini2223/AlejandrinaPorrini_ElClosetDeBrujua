let index = 0;
const intervalo = 8000;
const imagenes = document.querySelectorAll('.imagen');
const carrousel = document.querySelector('.carrousel-imagenes');

function mostrarImagen() {
if (index >= imagenes.length / 2.5) {
      index = 0;
}

carrousel.style.transform = `translateX(-${index * 100}%)`;

index++;
}

setInterval(mostrarImagen, intervalo);