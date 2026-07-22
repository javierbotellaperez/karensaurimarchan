/* ==========================================================================
   MAIN.JS — GENERAL INTERACTION & LIGHTBOX MODAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Active Menu State on Scroll
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Video Modal (Lightbox para Vimeo / YouTube en la rejilla)
    const videoCards = document.querySelectorAll('.video-card');
    
    // Crear el modal e inyectarlo en el body
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">CLOSE ✕</button>
            <iframe src="" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(modal);

    const iframe = modal.querySelector('iframe');
    const closeBtn = modal.querySelector('.close-modal');

    // Evento click para abrir modal
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const vimeoId = card.getAttribute('data-vimeo-id');
            const youtubeId = card.getAttribute('data-youtube-id');

            if (vimeoId) {
                iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
            } else if (youtubeId) {
                iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
            } else {
                return;
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquear scroll
        });
    });

    // Función para cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = ''; // Restaurar scroll
    }

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
