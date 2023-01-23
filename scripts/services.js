import '../common/preloader'
import '../common/cursor'
import '../common/header'

import { gsap } from "gsap";
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

// animations 

const TL = gsap.timeline()
TL.from('.services-slider', { duration: 2, y: -200, opacity: 0 })
  .from('.services-slider-2', { duration: 2, y: 200, opacity: 0 }, '-=1')
  .from('.side-nav__item', { duration: 1, y: -200, opacity: 0, stagger: 0.1 })
  .from('.side-nav__button', { duration: 1, y: -200, opacity: 0 })
const LINKS = document.querySelectorAll('.href')
LINKS.forEach(element => {
  element.addEventListener("click", (e) => {
    e.preventDefault()
    const HREF = element.href
    TL.reverse()
    setTimeout(function () { window.location = HREF }, 5300);
  })
});