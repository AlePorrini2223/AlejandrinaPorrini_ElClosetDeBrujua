   let currentIndex = 0;

   function moveCarousel(direction) {
   const items = document.querySelectorAll('.carousel-item');
   const totalItems = items.length;

   // Eliminar la clase "active" del elemento actual
   items[currentIndex].classList.remove('active');

   // Calcular el nuevo índice
   currentIndex = (currentIndex + direction + totalItems) % totalItems;

   // Añadir la clase "active" al nuevo elemento
   items[currentIndex].classList.add('active');

   // Mover el carrusel
   const carousel = document.querySelector('.carousel');
   carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
   }
