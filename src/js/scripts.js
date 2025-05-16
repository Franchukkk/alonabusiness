document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.burger-navigation');
    const body = document.body;

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('open');
        body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.burger-navigation a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('open');
            body.classList.remove('no-scroll');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

