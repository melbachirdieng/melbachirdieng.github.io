// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Create modal for images if it doesn't exist
function createModal() {
    if (!document.getElementById('imageModal')) {
        const modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <span class="modal-close" onclick="closeModal()">&times;</span>
            <img class="modal-content" id="modalImage">
        `;
        document.body.appendChild(modal);
    }
}

// Open modal with image
function openModal(imageSrc) {
    createModal();
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImg.src = imageSrc;

    // Close modal when clicking outside the image
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Show all images in a gallery
function showGallery(projectName, imageCount) {
    createModal();
    const modal = document.getElementById('imageModal');

    // Create gallery container
    const galleryHTML = `
        <div class="gallery-modal-content">
            <div class="gallery-grid">
                ${Array.from({length: imageCount}, (_, i) => `
                    <img src="${projectName}/${i + 1}.png" alt="${projectName} image ${i + 1}" onclick="openModal('${projectName}/${i + 1}.png')">
                `).join('')}
            </div>
        </div>
    `;

    modal.innerHTML = `
        <span class="modal-close" onclick="closeModal()">&times;</span>
        ${galleryHTML}
    `;

    // Add dynamic gallery grid styles
    const style = document.createElement('style');
    style.textContent = `
        .gallery-modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 90%;
            max-height: 90%;
            overflow-y: auto;
            background: var(--dark-2);
            padding: 2rem;
            border-radius: 20px;
            border: 2px solid var(--primary);
        }

        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .gallery-grid img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 12px;
            border: 2px solid rgba(0, 255, 136, 0.3);
            cursor: pointer;
            transition: all 0.3s;
        }

        .gallery-grid img:hover {
            border-color: var(--primary);
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(0, 255, 136, 0.4);
        }
    `;

    if (!document.getElementById('gallery-styles')) {
        style.id = 'gallery-styles';
        document.head.appendChild(style);
    }

    modal.style.display = 'block';

    // Close modal when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

// Tableau de synthèse toggle
function toggleSynthese() {
    const content = document.getElementById('syntheseContent');
    const label   = document.getElementById('syntheseLabel');
    const btn     = document.querySelector('.synthese-toggle-btn');

    const isOpen = content.classList.contains('open');

    if (isOpen) {
        content.classList.remove('open');
        label.textContent = 'Afficher le tableau de synthèse';
        btn.classList.remove('active');
    } else {
        content.classList.add('open');
        label.textContent = 'Masquer le tableau de synthèse';
        btn.classList.add('active');
        // Scroll doux vers le tableau
        setTimeout(() => {
            content.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Contact Form - mailto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject_field').value.trim();
        const message = document.getElementById('message').value.trim();

        const body = `Nom : ${name}\nEmail : ${email}\n\n${message}`;

        const mailtoLink = `mailto:mouhammadelbachirdieng@gmail.com`
            + `?subject=${encodeURIComponent(subject)}`
            + `&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    });
}
