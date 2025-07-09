(function() {
    if (sessionStorage.getItem('lang')) {
        return;
    }

    const userLang = navigator.language || navigator.userLanguage; 
    const isRussian = userLang.startsWith('ru');
    const isRuPage = window.location.pathname.includes('/ru/');
    
    if (isRussian && !isRuPage) {
        sessionStorage.setItem('lang', 'ru');
        window.location.href = 'ru/index.html';
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const langSwitchers = document.querySelectorAll('.lang-switcher a');
    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            const lang = e.target.innerText.toLowerCase();
            sessionStorage.setItem('lang', lang);
        });
    });

    const servicesGrid = document.getElementById('services-grid');
    const scrollContainer = document.querySelector('.services-section');
    const mobileBreakpoint = 768;

    if (window.innerWidth <= mobileBreakpoint) {
        const dotsContainer = document.getElementById('dots-container');
        const serviceCards = document.querySelectorAll('.service-card');

        if (dotsContainer && serviceCards.length > 0) {
            serviceCards.forEach(() => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll('.dot');
            if (dots.length > 0) {
                dots[0].classList.add('active');
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cardIndex = Array.from(serviceCards).indexOf(entry.target);
                        dots.forEach(dot => dot.classList.remove('active'));
                        dots[cardIndex].classList.add('active');
                    }
                });
            }, {
                root: scrollContainer,
                threshold: 0.5,
            });

            serviceCards.forEach(card => observer.observe(card));
        }
    }

    function handleDragScroll(e) {
        if (window.innerWidth > mobileBreakpoint) return;
    }

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
