/* ==========================================================================
   SLIDER.JS — FULLSCREEN HERO VIDEO SLIDER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slider-section .slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const counterDisplay = document.querySelector('.slide-counter');

    if (!slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Actualiza la visualización del slider y el contador
    function updateSlider(index) {
        slides.forEach((slide, i) => {
            const video = slide.querySelector('video');
            if (i === index) {
                slide.classList.add('active');
                if (video) {
                    video.currentTime = 0;
                    video.play().catch(() => {
                        // Manejo de autostart restringido por navegador
                    });
                }
            } else {
                slide.classList.remove('active');
                if (video) {
                    video.pause();
                }
            }
        });

        // Formato 01 / 05
        const formattedCurrent = String(index + 1).padStart(2, '0');
        const formattedTotal = String(totalSlides).padStart(2, '0');
        if (counterDisplay) {
            counterDisplay.textContent = `${formattedCurrent} / ${formattedTotal}`;
        }
    }

    // Siguiente slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider(currentIndex);
    }

    // Anterior slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider(currentIndex);
    }

    // Event Listeners para botones
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Navegación por teclado (flechas izquierda/derecha)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Inicializar slider
    updateSlider(currentIndex);
});
