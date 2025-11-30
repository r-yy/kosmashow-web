window.addEventListener('scroll', function() {
    var header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.getElementById('toggleButton').addEventListener('click', function() {
    var hiddenConcerts = document.getElementById('hiddenConcerts');
    if (hiddenConcerts.classList.contains('show')) {
        hiddenConcerts.classList.remove('show');
        this.textContent = 'Другие концерты';
    } else {
        hiddenConcerts.classList.add('show');
        this.textContent = 'Скрыть';
    }
});

window.addEventListener('scroll', function() {
    var header = document.getElementById('main-header');
    var mainLogoContainer = document.getElementById('mainLogoContainer');
    var headerLogoContainer = document.getElementById('headerLogoContainer');
    
    if (window.scrollY > window.innerHeight / 2) {
        header.classList.add('scrolled');
        if (headerLogoContainer.innerHTML === "") {
            headerLogoContainer.innerHTML = mainLogoContainer.innerHTML; // Copy the logo content
        }
        mainLogoContainer.style.visibility = 'hidden'; // Hide the main logo in hero section
    } else {
        header.classList.remove('scrolled');
        mainLogoContainer.style.visibility = 'visible'; // Show the main logo in hero section
        headerLogoContainer.innerHTML = ""; // Clear the header logo
    }
});

window.addEventListener('scroll', function() {
    var header = document.getElementById('main-header');

    if (window.scrollY > window.innerHeight / 2) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

let currentIndex = 0;
let scrollPosition = 0;
const images = [
    'logos/collage/1.jpg',
    'logos/collage/2.jpg',
    'logos/collage/3.jpg',
    'logos/collage/4.jpg',
    'logos/collage/5.jpg',
    'logos/collage/6.jpg',
    'logos/collage/7.jpg',
    'logos/collage/8.jpg',
    'logos/collage/9.jpg',
    'logos/collage/10.jpg',
    'logos/collage/11.jpg',
    'logos/collage/12.jpg',
    'logos/collage/13.jpg',
    'logos/collage/14.jpg',
    'logos/collage/15.jpg'
];

function showLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('show');
    document.body.classList.add('noscroll');
    document.addEventListener('keydown', handleKeydown);

    lightbox.addEventListener('touchstart', handleTouchStart, false);
    lightbox.addEventListener('touchmove', handleTouchMove, false);
    lightbox.addEventListener('touchend', handleTouchEnd, false);
}

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = images[currentIndex];
}

function closeLightbox(event) {
    if (event.target !== document.getElementById('lightbox-img') && !event.target.classList.contains('prev') && !event.target.classList.contains('next') && !event.target.classList.contains('close')) {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('show');
        document.body.classList.remove('noscroll');
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
        document.removeEventListener('keydown', handleKeydown);

        lightbox.removeEventListener('touchstart', handleTouchStart, false);
        lightbox.removeEventListener('touchmove', handleTouchMove, false);
        lightbox.removeEventListener('touchend', handleTouchEnd, false);
    }
}

function handleKeydown(event) {
    if (event.key === 'ArrowRight') {
        changeImage(1);
    } else if (event.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (event.key === 'Escape') {
        closeLightbox({ target: document.body });
    }
}

let startX = null;
let startY = null;

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    startX = firstTouch.clientX;
    startY = firstTouch.clientY;
}

function handleTouchMove(event) {
    if (!startX || !startY) {
        return;
    }

    const endX = event.touches[0].clientX;
    const endY = event.touches[0].clientY;

    const diffX = startX - endX;
    const diffY = startY - endY;

    // Определяем, было ли это горизонтальное или вертикальное движение
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Горизонтальное свайп
        if (diffX > 0) {
            // Свайп влево
            changeImage(1);
        } else {
            // Свайп вправо
            changeImage(-1);
        }
    } else {
        // Вертикальное свайп
        if (diffY > 0) {
            // Свайп вверх, закрываем лайтбокс
            closeLightbox({ target: document.body });
        } else {
            // Свайп вниз, закрываем лайтбокс
            closeLightbox({ target: document.body });
        }
    }

    // Сбрасываем начальные значения
    startX = null;
    startY = null;
}

function handleTouchEnd() {
    // Обнуляем координаты после окончания свайпа
    startX = null;
    startY = null;
}

// === GALA SLIDER ===

// индексы
let galaIndex = 0;
let galaSlides = document.querySelectorAll(".gala-slide");
let galaDotsContainer = document.getElementById("galaDots");

// СОЗДАЁМ ТОЧКИ
galaSlides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("gala-dot");
    dot.onclick = () => manualGalaSlide(i);
    galaDotsContainer.appendChild(dot);
});

let galaDots = document.querySelectorAll(".gala-dot");

// ПОКАЗ СЛАЙДА
function showGalaSlide(n) {
    galaIndex = (n + galaSlides.length) % galaSlides.length;

    galaSlides.forEach(slide => slide.classList.remove("active"));
    galaDots.forEach(dot => dot.classList.remove("active"));

    galaSlides[galaIndex].classList.add("active");
    galaDots[galaIndex].classList.add("active");
}

// ФУНКЦИЯ АВТОПРОКРУТКИ (НЕ ОСТАНАВЛИВАЕТ АВТОПЛЕЙ)
function autoNextGalaSlide() {
    if (!galaAutoPlay) return;
    galaIndex++;
    showGalaSlide(galaIndex);
}

// ФУНКЦИЯ РУЧНОГО УПРАВЛЕНИЯ (ОСТАНАВЛИВАЕТ АВТОПЛЕЙ)
function manualGalaSlide(n) {
    stopGalaAutoplay();
    showGalaSlide(n);
}

// СТРЕЛКИ — тоже ручное управление
function changeGalaSlide(direction) {
    stopGalaAutoplay();
    galaIndex += direction;
    showGalaSlide(galaIndex);
}

// ОСТАНОВКА АВТОПЛЕЯ
let galaAutoPlay = true;
function stopGalaAutoplay() {
    galaAutoPlay = false;
    clearInterval(galaAutoInterval);
}

// АВТОПЛЕЙ — до первого клика!
let galaAutoInterval = setInterval(autoNextGalaSlide, 4000);

// старт
showGalaSlide(0);

function scrollToGala() {
    const target = document.getElementById("gala-show");
    const offset = 80; // можно менять
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
}