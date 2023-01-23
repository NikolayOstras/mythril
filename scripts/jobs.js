import '../common/header'

import { gsap } from "gsap";
import Swiper from 'swiper';
import { Autoplay } from 'swiper';
Swiper.use([Autoplay]);
import 'swiper/css';

const SLIDES = [...document.querySelectorAll('.jobs-slide')]
const SLIDES_COUNT = 2
const SLIDERS = document.querySelectorAll('.jobs-slider')
const $SLIDER = document.querySelector('.jobs-slider')
const $WRAPPER = $SLIDER.querySelector('.swiper-wrapper');

const TABLET = window.matchMedia('(max-width: 992px)');

const mobileInit = () => {
  for (let i = SLIDES_COUNT; i < SLIDES.length; i++) {
    $WRAPPER.appendChild(SLIDES[i]);
  }

  SLIDERS[1].style.display = 'none'
  SLIDERS[2].style.display = 'none'


  const SLIDER = new Swiper(SLIDERS[0], {
    loopedSlides: SLIDERS.length,
    slidesPerView: 'auto',
    spaceBetween: 120,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    speed: 70000,
  });
}

const desktopInit = () => {
  SLIDERS.forEach(function (elem) {
    const SLIDER = new Swiper(elem, {
      loopedSlides: SLIDES_COUNT,
      slidesPerView: 'auto',
      spaceBetween: 120,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      speed: 70000,
    })
  });
}

if (TABLET.matches == true && SLIDERS) {
  mobileInit()
}
else {
  desktopInit()
}

MicroModal.init();
const SLIDER_1 = new Swiper('.popup__slider-1', {
  loop: true,
  autoHeight: true,
  slidesPerView: 1.2,

  autoplay: {
    delay: 100,
    disableOnInteraction: false
  },
  speed: 20000,

  breakpoints: {
    768: {
      direction: 'vertical',

      slidesPerView: 'auto',
    },
  }
})
const SLIDER_2 = new Swiper('.popup__slider-2', {
  loop: true,
  direction: 'vertical',
  slidesPerView: 'auto',
  autoplay: {
    delay: 200,
    disableOnInteraction: false
  },
  speed: 40000,
  autoHeight: true
})

// animations 
const MENU_ITEMS = document.querySelectorAll('.nav__item ')
const MENU_ITEMS_REVERSED = [...MENU_ITEMS].reverse()
const TL = gsap.timeline()
TL.from('.jobs-slider', { duration: 3, x: -300, opacity: 0, stagger: 0.25 })
  .from(MENU_ITEMS_REVERSED, { duration: 1.5, x: -200, opacity: 0, stagger: 0.1 }, '-=2')

const MODAL_TL = gsap.timeline();
const $MODAL_BUTTONS = document.querySelectorAll('.popup__button');
MODAL_TL.fromTo('.popup__sliders', 1, { y: -200, opacity: 0 }, { y: 0, opacity: 1 })
  .from('.popup__title', { duration: 0.6, scale: 0, x: -100, opacity: 0 })
  .from('.popup__text', { duration: 0.6, scale: 0, x: -100, opacity: 0 })
MODAL_TL.pause();

$MODAL_BUTTONS.forEach(function (elem) {
  elem.addEventListener('click', function (e) {
    MODAL_TL.play();
  });
});