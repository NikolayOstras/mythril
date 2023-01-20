import '../common/header'

import Swiper from 'swiper';
import { Autoplay } from 'swiper';
Swiper.use([Autoplay]);
import 'swiper/css';


const HERO_TITLE_SWIPER = new Swiper('.hero__title-slider', {
  loopedSlides: 3,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  speed: 50000,
  breakpoints: {
    768: {
      slidesPerView: 2.5,
      spaceBetween: 60
    },
  }
})

const HERO_GALLERY_SWIPER = new Swiper('.hero-gallery', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 100,
    disableOnInteraction: false,
    reverseDirection: true
  },
  speed: 50000,
  breakpoints: {
    768: {
      slidesPerView: 2.5,
      spaceBetween: 60
    },
  }
})