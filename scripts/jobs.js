import '../common/header'
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