document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. LÓGICA DEL SLIDER PRINCIPAL --- */
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const counter = document.querySelector('.slide-counter');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            const video = slide.querySelector('video');
            if (video) video.pause();
        });

        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        
        const currentVideo = slides[currentSlide].querySelector('video');
        if (currentVideo) currentVideo.play();

        counter.textContent = `0${currentSlide + 1} / 0${slides.length}`;
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }

    /* --- 2. MODAL LIGHTBOX PARA REPRODUCIR VÍDEOS AL HACER CLIC EN THUMBNAILS --- */
    const videoCards = document.querySelectorAll('.video-card');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelector('.close-modal');

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoSrc = card.getAttribute('data-video-src');
            if (videoSrc) {
                modalVideo.src = videoSrc;
                modal.classList.add('active');
                modalVideo.play();
            }
        });
    });

    function closeVideoModal() {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeVideoModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeVideoModal();
        });
    }
});
