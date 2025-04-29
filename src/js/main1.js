// Highlight current page in menu
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-list li a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === 'main.html' && linkPage === 'index.html') ||
        (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// Таймер на 8 дней
function updateTimer() {
    const now = new Date();
    const tournamentDate = new Date(now);
    tournamentDate.setDate(now.getDate() + 8); // +8 дней
    tournamentDate.setHours(19, 0, 0, 0); // Устанавливаем время 19:00
  
    const diff = tournamentDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }
  
  setInterval(updateTimer, 1000);
  updateTimer(); 


  // Анимация чисел в статистике
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Запускаем анимацию при появлении секции в viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    observer.observe(aboutSection);
}


function initMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function() {
            // Создаем карту с явным указанием темной темы
            const map = new ymaps.Map('yandex-map', {
                center: [59.839410, 30.404894],
                zoom: 17,
                controls: ['zoomControl']
            }, {
                suppressMapOpenBlock: true,
                yandexMapDisablePoiInteractivity: true,
                // Явно указываем тему при создании
                theme: 'dark#night' // Самый темный вариант
            });
            

            // Дополнительные настройки темы
            map.options.set({
                // Принудительно скрываем светлые элементы
                'poi': {
                    'showText': 'never' // Отключаем названия POI
                },
                'controls': {
                    'geolocationControl': {
                        'float': 'none'
                    }
                }
            });

            // Метка
            const placemark = new ymaps.Placemark(
                [59.839410, 30.404894], 
                {
                    hintContent: 'Game Force',
                    balloonContent: 'г. Санкт-Петербург, Загребский бульвар, 23к1'
                },
                {
                    preset: 'islands#violetIcon',
                    iconColor: '#9f56fa'
                }
            );
            
            map.geoObjects.add(placemark);
            
            // Принудительный ререндер темы
            setTimeout(() => {
                map.container.fitToViewport();
            }, 500);
        });
    }
}

// Подключаем API с принудительным обновлением версии
const script = document.createElement('script');
script.src = 'https://api-maps.yandex.ru/2.1/?apikey=a02de32a-5612-41c8-a9f7-109f00b53060&lang=ru_RU&onload=initMap&v=2.1.79';
document.head.appendChild(script);




document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#9f56fa"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#9f56fa",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });


    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

 
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

   
    const navLinks = document.querySelectorAll('.nav-list li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });


    if (document.querySelector('.feature-card')) {
        $('.feature-card').tilt({
            maxTilt: 10,
            perspective: 1000,
            scale: 1.03,
            speed: 300,
            transition: true,
            reset: true
        });
    }


    const monitor = document.querySelector('.monitor');
    if (monitor) {
        setInterval(() => {
            monitor.style.boxShadow = `0 0 ${20 + Math.random() * 20}px rgba(159, 86, 250, ${0.4 + Math.random() * 0.3})`;
        }, 2000);
    }

    
    const neonLines = document.querySelectorAll('.neon-line');
    neonLines.forEach(line => {
        setInterval(() => {
            line.style.opacity = 0.3 + Math.random() * 0.4;
        }, 1000);
    });
});


// Слайдер акций
document.addEventListener('DOMContentLoaded', function() {
    // Элементы слайдера
    const slider = document.querySelector('.promo-slider');
    const cards = document.querySelectorAll('.promo-card');
    const dotsContainer = document.querySelector('.promo-dots');
    const prevBtn = document.querySelector('.promo-prev');
    const nextBtn = document.querySelector('.promo-next');
    
    if (!slider || cards.length === 0) return;
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 секунд
    let isAnimating = false;
  
    // Создаем индикаторы-точки
    function createDots() {
      dotsContainer.innerHTML = '';
      cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => !isAnimating && goToSlide(index));
        dotsContainer.appendChild(dot);
      });
      updateDots();
    }
  
    // Обновляем активную точку
    function updateDots() {
      const dots = dotsContainer.querySelectorAll('span');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  
    // Анимация перехода
    function animateSlide(newIndex) {
      isAnimating = true;
      
      // Прячем текущий слайд
      cards[currentIndex].classList.remove('active');
      cards[currentIndex].style.opacity = 0;
      
      // Показываем новый слайд
      cards[newIndex].classList.add('active');
      cards[newIndex].style.opacity = 1;
      
      currentIndex = newIndex;
      updateDots();
      
      // Сбрасываем флаг анимации после завершения
      setTimeout(() => {
        isAnimating = false;
      }, 800);
    }
  
    // Переход к конкретному слайду
    function goToSlide(index) {
      if (isAnimating) return;
      
      const newIndex = (index + cards.length) % cards.length;
      animateSlide(newIndex);
      restartAutoSlide();
    }
  
    // Автоматическое перелистывание
    function startAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        if (!isAnimating) {
          goToSlide(currentIndex + 1);
        }
      }, slideDuration);
    }
  
    // Перезапуск автопрокрутки
    function restartAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
  
    // Инициализация слайдера
    function initSlider() {
      // Активируем первый слайд
      cards[0].classList.add('active');
      cards[0].style.opacity = 1;
      
      // Создаем точки навигации
      createDots();
      
      // Навешиваем обработчики кнопок
      nextBtn.addEventListener('click', () => {
        if (!isAnimating) goToSlide(currentIndex + 1);
      });
      
      prevBtn.addEventListener('click', () => {
        if (!isAnimating) goToSlide(currentIndex - 1);
      });
      
      // Запускаем автопрокрутку
      startAutoSlide();
      
      // Пауза при наведении
      slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
      });
      
      slider.addEventListener('mouseleave', () => {
        if (!isAnimating) startAutoSlide();
      });
    }
  
    // Запускаем слайдер
    initSlider();
  });

  // Плавная прокрутка при клике на ссылки с #
document.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]')) {
      e.preventDefault();
      const id = e.target.getAttribute('href');
      document.querySelector(id)?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  });


  document.querySelectorAll('a[href="#"]').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Остановить переход по ссылке
        alert('Раздел ещё в разработке!');
    });
});
