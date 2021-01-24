'use strict';

window.addEventListener('load', function () {
  setTimeout(function () {
    document.body.classList.add('loaded');
  }, 400);
});
window.addEventListener('DOMContentLoaded', function () {
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  smoothScroll();
  menuActive();
  tabs();
  slides();

  function smoothScroll() {
    document.body.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      var href = e.target.getAttribute('href');
      if (href[0] !== '#') return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  function menuActive() {
    var menu = document.querySelector('.header__menu'),
        hamburger = document.querySelector('.header__hamburger');
    hamburger.addEventListener('click', function () {
      document.body.classList.toggle('menu-active');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        document.body.classList.remove('menu-active');
      }
    });
  }

  function tabs() {
    var tabs = document.querySelectorAll('.menu__tab'),
        slides = document.querySelectorAll('.menu__slide'),
        tabsParent = document.querySelector('.menu__tabs');
    hideTabsContent();
    showTabsContent();

    function hideTabsContent() {
      slides.forEach(function (slide) {
        slide.classList.add('hide');
        slide.classList.remove('show', 'slideIn', 'fadeInSlide');
        tabs.forEach(function (item) {
          item.classList.remove('menu__tab_active');
        });
      });
    }

    function showTabsContent() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      slides[i].classList.add('show', 'slideIn', 'fadeInSlide');
      slides[i].classList.remove('hide');
      tabs[i].classList.add('menu__tab_active');
    }

    tabsParent.addEventListener('click', function () {
      var target = event.target;

      if (target && target.classList.contains('menu__tab')) {
        tabs.forEach(function (item, i) {
          if (target == item) {
            hideTabsContent();
            showTabsContent(i);
          }
        });
      }
    });
  }

  function slides() {
    var introSlides = document.querySelectorAll('.intro__slide');
    var currentSlide = 0;
    showSlides(currentSlide);

    function showSlides(n) {
      if (n >= introSlides.length) {
        currentSlide = 0;
      }

      if (n < 0) {
        currentSlide = introSlides.length - 1;
      }

      introSlides.forEach(function (item) {
        item.classList.add('hideSlide', 'fadeOut');
        item.classList.remove('showSlide', 'fadeIn');
      });
      introSlides[currentSlide].classList.add('showSlide', 'fadeIn');
      introSlides[currentSlide].classList.remove('hideSlide', 'fadeOut');
    }

    function runSlide(n) {
      showSlides(currentSlide += n);
    }

    var timer = setInterval(function () {
      runSlide(1);
    }, 4000);
  }
});