
'use strict';

window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 400)
});

window.addEventListener('DOMContentLoaded', () => {

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    smoothScroll();
    menuActive();
    tabs();
    slides();

    function smoothScroll() {
        document.body.addEventListener('click', e => {

            if (e.target.tagName !== 'A') return;

            const href = e.target.getAttribute('href');
            if (href[0] !== '#') return;
            const el = document.querySelector(href);
            if (!el) return;

            e.preventDefault();
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        });

    }

    function menuActive() {
        const menu = document.querySelector('.header__menu'),
            hamburger = document.querySelector('.header__hamburger');

        hamburger.addEventListener('click', () => {
            document.body.classList.toggle('menu-active')
        });
        menu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                document.body.classList.remove('menu-active');
            }
        })

    }

    function tabs() {
        const tabs = document.querySelectorAll('.menu__tab'),
            slides = document.querySelectorAll('.menu__slide'),
            tabsParent = document.querySelector('.menu__tabs');

        hideTabsContent();
        showTabsContent();

        function hideTabsContent() {
            slides.forEach(slide => {
                slide.classList.add('hide');
                slide.classList.remove('show', 'slideIn', 'fadeInSlide');

                tabs.forEach(item => {
                    item.classList.remove('menu__tab_active');
                });
            });
        }

        function showTabsContent(i = 0) {
            slides[i].classList.add('show', 'slideIn', 'fadeInSlide');
            slides[i].classList.remove('hide');
            tabs[i].classList.add('menu__tab_active');
        }

        tabsParent.addEventListener('click', () => {
            const target = event.target;
            if (target && target.classList.contains('menu__tab')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabsContent();
                        showTabsContent(i);
                    }
                })
            }
        })
    }

    function slides() {
        const introSlides = document.querySelectorAll('.intro__slide');

        let currentSlide = 0;

        showSlides(currentSlide);

        function showSlides(n) {
            if (n >= introSlides.length) {
                currentSlide = 0;
            }

            if (n < 0) {
                currentSlide = introSlides.length - 1;
            }
            introSlides.forEach(item => {
                item.classList.add('hideSlide', 'fadeOut');
                item.classList.remove('showSlide', 'fadeIn');
            });
            introSlides[currentSlide].classList.add('showSlide', 'fadeIn');
            introSlides[currentSlide].classList.remove('hideSlide', 'fadeOut');
        }

        function runSlide(n) {
            showSlides(currentSlide += n);
        }

        let timer = setInterval(() => {
            runSlide(1);
        }, 4000);

    }

});