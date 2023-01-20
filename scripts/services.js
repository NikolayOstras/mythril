import '../common/header'

import Swiper from 'swiper';
import { Autoplay } from 'swiper';
Swiper.use([Autoplay]);
import 'swiper/css';

const SLIDER_1 = new Swiper('.services-slider', {
  loop: true,
  direction: 'vertical',
  slidesPerView: 'auto',
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  speed: 40000,
  autoHeight: true,
  spaceBetween: 30,
  breakpoints: {
    768: {
      // slidesPerView: 3.5,
      spaceBetween: 60
    },
  }
})
const SLIDER_2 = new Swiper('.services-slider-2', {
  loop: true,
  direction: 'vertical',
  slidesPerView: 'auto',
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: true
  },
  speed: 40000,
  autoHeight: true,
  spaceBetween: 30,
  breakpoints: {
    768: {
      // slidesPerView: 3.5,
      spaceBetween: 60
    },
  }
})