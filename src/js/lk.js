document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const loginForm = document.getElementById('loginForm');
    const lkContent = document.getElementById('lkContent');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const errorMsg = document.getElementById('errorMsg');
    const qrCodeElement = document.getElementById('qrCode');
    const progressContainer = document.querySelector('.progress-container');
    qrCodeElement.addEventListener('click', showExpandedQR);
    
    // Данные для входа
    const validCredentials = {
        username: 'admin',
        password: 'admin'
    };

    // Генерация QR-кода внутри рамки
    function generateQRCode() {
        qrCodeElement.innerHTML = '';
        
        // Создаем canvas для QR-кода
        const canvas = document.createElement('canvas');
        qrCodeElement.appendChild(canvas);
        
        // Генерируем случайные данные для QR
        const randomData = {
            id: 'GF-' + Math.floor(Math.random() * 1000000),
            user: document.getElementById('username').value.trim() || 'ADMIN',
            date: new Date().toLocaleDateString(),
            code: Math.random().toString(36).substr(2, 8).toUpperCase()
        };
        
        // Настройки QR-кода
        QRCode.toCanvas(canvas, JSON.stringify(randomData), {
            width: 90,
            margin: 0,
            color: {
                dark: '#9f56fa', // Фиолетовый
                light: '#1a0721' // Темный фон
            },
            errorCorrectionLevel: 'H'
        }, function(error) {
            if (error) {
                console.error(error);
                generateBarcodeFallback();
            }
        });
    }

    // Показ увеличенного QR-кода
    function showExpandedQR() {
        // Создаем overlay
        const overlay = document.createElement('div');
        overlay.className = 'qr-overlay';
        
        // Создаем контейнер для QR-кода
        const qrContainer = document.createElement('div');
        qrContainer.className = 'expanded-qr-container';
        
        // Создаем canvas для QR-кода
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        
        // Генерируем те же данные, что и для основного QR-кода
        const randomData = {
            id: 'GF-' + Math.floor(Math.random() * 1000000),
            user: document.getElementById('username').value.trim() || 'ADMIN',
            date: new Date().toLocaleDateString(),
            code: Math.random().toString(36).substr(2, 8).toUpperCase()
        };
        
        // Генерируем QR-код прямо в overlay
        QRCode.toCanvas(canvas, JSON.stringify(randomData), {
            width: 280,
            margin: 2,
            color: {
                dark: '#9f56fa', // Фиолетовый
                light: '#1a0721' // Темный фон
            },
            errorCorrectionLevel: 'H'
        }, function(error) {
            if (error) {
                console.error(error);
                // Fallback, если не удалось сгенерировать QR-код
                canvas.style.backgroundColor = '#1a0721';
                const errorText = document.createElement('div');
                errorText.textContent = 'QR Code Error';
                errorText.style.color = '#9f56fa';
                qrContainer.appendChild(errorText);
            }
        });
        
        // Добавляем элементы в DOM
        qrContainer.appendChild(canvas);
        overlay.appendChild(qrContainer);
        document.body.appendChild(overlay);
        
        // Анимация появления
        setTimeout(() => {
            overlay.style.opacity = '1';
            qrContainer.style.transform = 'scale(1)';
        }, 10);
        
        // Закрытие по клику
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.opacity = '0';
                qrContainer.style.transform = 'scale(0.9)';
                setTimeout(() => overlay.remove(), 300);
            }
        });
    }

    // Fallback на штрих-код
    function generateBarcodeFallback() {
        qrCodeElement.innerHTML = '';
        
        const barcode = document.createElement('div');
        barcode.className = 'barcode-fallback';
        
        // Генерируем 12 цифр
        let digits = '';
        for (let i = 0; i < 12; i++) {
            digits += Math.floor(Math.random() * 10);
        }
        
        // Создаем полосы
        for (let i = 0; i < 24; i++) {
            const bar = document.createElement('div');
            bar.className = 'barcode-line';
            bar.style.height = `${40 + Math.random() * 30}px`;
            bar.style.backgroundColor = i % 2 === 0 ? '#9f56fa' : '#00f0ff';
            barcode.appendChild(bar);
        }
        
        // Добавляем цифры
        const numbers = document.createElement('div');
        numbers.className = 'barcode-numbers';
        numbers.textContent = digits;
        
        qrCodeElement.appendChild(barcode);
        qrCodeElement.appendChild(numbers);
    }

    // Неоновая анимация прогресса
    function updateProgressBar() {
        const progressFilled = document.querySelector('.progress-filled');
        const currentProgress = document.querySelector('.current-progress');
        
        // Получаем значения
        const progress = parseInt(progressFilled.dataset.progress) || 85;
        const max = parseInt(progressFilled.dataset.max) || 500;
        const percent = (progress / max) * 100;
        
        // Сбрасываем перед анимацией
        progressFilled.style.width = '0%';
        currentProgress.textContent = '0 M';
        
        // Рассчитываем параметры анимации
        const duration = 1500; // 1.5 секунды на всю анимацию
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progressRatio = Math.min(elapsed / duration, 1);
            const currentWidth = progressRatio * percent;
            
            progressFilled.style.width = `${currentWidth}%`;
            currentProgress.textContent = `${Math.round(progress * progressRatio)} M`;
            
            if (progressRatio < 1) {
                requestAnimationFrame(animate);
            } else {
                // Анимация завершена
                currentProgress.textContent = `${progress} M`;
                if (percent >= 100) {
                    progressFilled.classList.add('complete');
                }
                // Обновляем скидку
                document.querySelector('.discount-badge strong').textContent = 
                    `${Math.floor(progress / 10)}%`;
            }
        }
        
        // Запускаем анимацию
        requestAnimationFrame(animate);
        
        // Создаем эффект свечения (если еще не создан)
        if (!progressFilled.querySelector('.progress-glow')) {
            const glow = document.createElement('div');
            glow.className = 'progress-glow';
            progressFilled.appendChild(glow);
        }
    }

    setTimeout(updateProgressBar, 500);

    // Добавьте эту функцию в lk.js
    function updateBonusPoints(points) {
    const progressElement = document.querySelector('.progress-filled');
    const bonusElement = document.querySelector('.bonus-points strong');
    
    // Обновляем данные
    progressElement.dataset.progress = points;
    bonusElement.textContent = `${points} M`;
    
    // Пересчитываем прогресс
    updateProgressBar();
}

// Пример использования (можно вызывать после важных действий):
// updateBonusPoints(150); // Установит 150 баллов

    // Обработчик входа
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (username === validCredentials.username && password === validCredentials.password) {
            loginForm.style.display = 'none';
            lkContent.style.display = 'block';
            
            // Генерация QR-кода
            generateQRCode();
            
            
            // Запуск анимации прогресса
            setTimeout(updateProgressBar, 500);
            
            // Обновление имени
            document.querySelector('.user-greeting h1 span').textContent = username.toUpperCase();
        } else {
            errorMsg.textContent = 'Неверный логин или пароль';
            setTimeout(() => errorMsg.textContent = '', 3000);
        }
    });

    // Обработчик выхода
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s';
        setTimeout(() => window.location.href = 'main.html', 500);
    });
});

document.querySelectorAll('a[href="#"]').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Остановить переход по ссылке
        alert('Раздел ещё в разработке!');
    });
});