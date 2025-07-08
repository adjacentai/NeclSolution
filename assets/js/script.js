(function() {
    const userLang = navigator.language || navigator.userLanguage; 
    const isRussian = userLang.startsWith('ru');
    const isRuPage = window.location.pathname.includes('/ru/');
    
    // Если язык браузера русский и мы не на русской версии, перенаправляем
    if (isRussian && !isRuPage) {
        // Эта ссылка будет работать и локально, и на сервере
        window.location.href = 'ru/index.html';
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.getElementById('services-grid');
    const scrollContainer = document.querySelector('.services-section'); // Используем этот контейнер
    const mobileBreakpoint = 768;

    function handleDragScroll(e) {
        if (window.innerWidth > mobileBreakpoint) return;
        // Эта логика будет работать только на мобильных
    }

    // Здесь может быть ваша логика для скролла, если она нужна
    // Например, автоматический скролл или drag-to-scroll
    if (servicesGrid) {
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.classList.add('active');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });
        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.classList.remove('active');
        });
        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.classList.remove('active');
        });
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2; 
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }
});
