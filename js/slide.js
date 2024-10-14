const images = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg',
    
    // Añade tantas imágenes como necesites
];
   

const slidesContainer = document.getElementById('slides');
const manualNavContainer = document.getElementById('manual-navigation');

images.forEach((image, index) => {
    // Crear y añadir los slides
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slide');
    
    const imgElement = document.createElement('img');
    imgElement.src = image;
    slideDiv.appendChild(imgElement);

    slidesContainer.appendChild(slideDiv);

    // Crear y añadir los botones de navegación manual
    const manualBtn = document.createElement('div');
    manualBtn.classList.add('manual-btn');
    manualBtn.dataset.index = index;
    manualNavContainer.appendChild(manualBtn);

    manualBtn.addEventListener('click', () => {
        currentIndex = index;
          updateSlides();
    });
});

let currentIndex = 0;

function showNextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
     updateSlides();
}

function updateSlides() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        if (index === currentIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Inicializar la primera imagen
updateSlides();

// Cambiar de imagen automáticamente cada 5 segundos
setInterval(showNextSlide, 5000);