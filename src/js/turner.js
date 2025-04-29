// Highlight current page in menu
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-list li a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// Initialize particles.js
// Автоматический расчет ширины прогресс-баров
function calculateProgressBars() {
    document.querySelectorAll('.progress-container').forEach(container => {
        const text = container.querySelector('.progress-text').textContent;
        const numbers = text.match(/\d+/g); // Находим все числа в тексте
        if (numbers && numbers.length >= 2) {
            const current = parseInt(numbers[0]);
            const max = parseInt(numbers[1]);
            const widthPercent = (current / max) * 100;
            container.querySelector('.progress-fill').style.width = `${widthPercent}%`;
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    calculateProgressBars();
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

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Tilt effect for tournament cards
    if (document.querySelector('.tournament-card')) {
        $('.tournament-card').tilt({
            maxTilt: 10,
            perspective: 1000,
            scale: 1.03,
            speed: 300,
            transition: true,
            reset: true
        });
    }

    // Rules accordion
    const ruleItems = document.querySelectorAll('.rule-item');
    ruleItems.forEach(item => {
        const header = item.querySelector('.rule-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
    });

    

    const animateOnScroll = () => {
        const tournamentCards = document.querySelectorAll('.tournament-card, .timeline-item, .winner-card');
        
        tournamentCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    };

    // Set initial styles for animation
    const tournamentCards = document.querySelectorAll('.tournament-card, .timeline-item, .winner-card');
    tournamentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    

    // Countdown timer for upcoming tournaments
    const countdownElements = document.querySelectorAll('.days-left');
    if (countdownElements.length > 0) {
        countdownElements.forEach(element => {
            const daysText = element.textContent.match(/\d+/);
            if (daysText) {
                const days = parseInt(daysText[0]);
                element.textContent = `Через ${days} ${declOfNum(days, ['день', 'дня', 'дней'])}`;
            }
        });
    }

    // Helper function for plural forms
    function declOfNum(number, titles) {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    // Random glow effects for tournament cards
    setInterval(() => {
        const cards = document.querySelectorAll('.tournament-card, .timeline-content, .winner-card');
        cards.forEach(card => {
            if (Math.random() > 0.7) {
                const glow = card.querySelector('.tournament-glow, .timeline-glow, .winner-glow');
                if (glow) {
                    glow.style.opacity = '0.7';
                    setTimeout(() => {
                        glow.style.opacity = '0';
                    }, 1000);
                }
            }
        });
    }, 3000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Активация правил турниров (аккордеон)
    const ruleItems = document.querySelectorAll('.rule-item');
    
    ruleItems.forEach(item => {
        const header = item.querySelector('.rule-header');
        
        header.addEventListener('click', () => {
            // Закрываем все открытые элементы
            ruleItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий элемент
            item.classList.toggle('active');
        });
    });
});

document.querySelectorAll('a[href="#"]').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Остановить переход по ссылке
        alert('Раздел ещё в разработке!');
    });
});



//FAQ