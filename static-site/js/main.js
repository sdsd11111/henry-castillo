// Reels data
const reels = [
  {
    id: "1",
    url: "https://www.instagram.com/reel/DRK06EikVsw/?igsh=MXJpNG9wc2J3ZWdkNw==",
    thumbnail: "/images/fitness-training-tips-gym-workout.jpg",
    title: "Consejos de entrenamiento",
  },
  {
    id: "2",
    url: "https://www.instagram.com/reel/DRSV-QUDmmu/?igsh=MWpxY3Y0ZmdzamUwYQ==",
    thumbnail: "/images/exercise-technique-proper-form.jpg",
    title: "Técnica y progresión",
  },
  {
    id: "3",
    url: "https://www.instagram.com/reel/DRncGbJDkLx/?igsh=a2wwbzc5amNzYnVz",
    thumbnail: "/images/smart-training-muscle-building.jpg",
    title: "Entrenamiento inteligente",
  },
  {
    id: "4",
    url: "https://www.instagram.com/reel/DRK06EikVsw/?igsh=MXJpNG9wc2J3ZWdkNw==",
    thumbnail: "/images/effective-workout-routine-gym.jpg",
    title: "Rutinas efectivas",
  },
];

// Initialize reels slider
function initializeReelsSlider() {
  const slider = document.getElementById('reels-slider');
  if (!slider) return;

  // Generate reels HTML
  const reelsHTML = reels.map((reel, index) => `
    <button
      class="group relative flex-shrink-0 w-[180px] sm:w-[200px] md:w-[250px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer snap-center transition-all duration-700 opacity-0 translate-y-8"
      style="transition-delay: ${index * 100}ms"
      onclick="openReel('${reel.url}')"
      aria-label="Ver video: ${reel.title} (abre Instagram en nueva ventana)"
    >
      <!-- Thumbnail -->
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style="background-image: url('${reel.thumbnail}')"
        aria-hidden="true"
      ></div>

      <!-- Gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
        aria-hidden="true"
      ></div>

      <!-- Play button -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
          <svg class="h-5 w-5 md:h-6 md:w-6 text-white fill-white ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
          </svg>
        </div>
      </div>

      <!-- Instagram badge -->
      <div class="absolute top-3 right-3">
        <svg class="h-5 w-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
        </svg>
      </div>

      <!-- Title -->
      <div class="absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <p class="text-white text-xs md:text-sm font-medium line-clamp-2">${reel.title}</p>
      </div>
    </button>
  `).join('');

  // Add "Ver más" card
  const verMasHTML = `
    <a
      href="https://www.instagram.com/henrycastillonarvaez"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative flex-shrink-0 w-[180px] sm:w-[200px] md:w-[250px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer snap-center bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-600/30 flex flex-col items-center justify-center gap-4 hover:border-blue-600 transition-all duration-700 opacity-0 translate-y-8"
      style="transition-delay: ${reels.length * 100}ms"
      aria-label="Ver más contenido en Instagram (abre en nueva ventana)"
    >
      <div class="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
        <svg class="h-7 w-7 md:h-8 md:w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
        </svg>
      </div>
      <div class="text-center px-4">
        <p class="text-white font-semibold text-sm md:text-base">Ver más en Instagram</p>
        <p class="text-gray-400 text-xs md:text-sm">@henrycastillonarvaez</p>
      </div>
    </a>
  `;

  slider.innerHTML = reelsHTML + verMasHTML;

  // Animate reels on scroll
  setTimeout(() => {
    const reelButtons = slider.querySelectorAll('button, a');
    reelButtons.forEach(button => {
      button.classList.remove('opacity-0', 'translate-y-8');
      button.classList.add('opacity-100', 'translate-y-0');
    });
  }, 100);
}

// Open reel in new window
function openReel(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

// Scroll controls
function initializeScrollControls() {
  const slider = document.getElementById('reels-slider');
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');

  if (!slider || !scrollLeftBtn || !scrollRightBtn) return;

  function checkScroll() {
    const { scrollLeft, scrollWidth, clientWidth } = slider;
    scrollLeftBtn.disabled = scrollLeft <= 0;
    scrollRightBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 10;
  }

  function scroll(direction) {
    const scrollAmount = 280;
    slider.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollLeftBtn.addEventListener('click', () => scroll('left'));
  scrollRightBtn.addEventListener('click', () => scroll('right'));
  slider.addEventListener('scroll', checkScroll);

  // Initial check
  checkScroll();
}

// Mobile menu
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (!mobileMenuBtn) return;

  let isMenuOpen = false;

  mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    // Create mobile menu if it doesn't exist
    let mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) {
      mobileMenu = document.createElement('div');
      mobileMenu.id = 'mobile-menu';
      mobileMenu.className = 'fixed inset-0 bg-zinc-900/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center';
      mobileMenu.innerHTML = `
        <button id="close-mobile-menu" class="absolute top-4 right-4 text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <nav class="flex flex-col space-y-8 text-center">
          <a href="#about" class="text-gray-300 hover:text-white transition-colors text-xl">Sobre mí</a>
          <a href="#services" class="text-gray-300 hover:text-white transition-colors text-xl">Servicios</a>
          <a href="#testimonials" class="text-gray-300 hover:text-white transition-colors text-xl">Testimonios</a>
          <a href="#contact" class="text-gray-300 hover:text-white transition-colors text-xl">Contacto</a>
        </nav>
      `;
      document.body.appendChild(mobileMenu);

      // Close menu when clicking links
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.remove();
          isMenuOpen = false;
        });
      });

      // Close menu when clicking close button
      document.getElementById('close-mobile-menu').addEventListener('click', () => {
        mobileMenu.remove();
        isMenuOpen = false;
      });
    }

    if (isMenuOpen) {
      document.body.appendChild(mobileMenu);
    } else {
      mobileMenu.remove();
    }
  });
}

// Contact form
function initializeContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name') || form.querySelector('input[type="text"]').value;
    const email = formData.get('email') || form.querySelector('input[type="email"]').value;
    const message = formData.get('message') || form.querySelector('textarea').value;

    // Create WhatsApp message
    const whatsappMessage = `Hola Henry, soy ${name}. Mi email es ${email}. ${message}`;
    const whatsappUrl = `https://wa.me/593986562727?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    form.reset();
  });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Intersection Observer for animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeReelsSlider();
  initializeScrollControls();
  initializeMobileMenu();
  initializeContactForm();
  initializeSmoothScrolling();
  initializeAnimations();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
