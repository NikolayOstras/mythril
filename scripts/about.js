import '../common/preloader'
import '../common/cursor'
import '../common/header'
import Accordion from '../vendor/components/accordion/accordion'
import '../vendor/components/accordion/accordion.css'

import { gsap } from "gsap";
import Swiper from 'swiper';
import { Autoplay } from 'swiper';
Swiper.use([Autoplay]);
import 'swiper/css';

const SLIDER = new Swiper('.about__swiper', {
  loop: true,
  spaceBetween: 30,
  direction: 'horizontal',
  slidesPerView: 2,

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: 'true'
  },
  speed: 20000,

  breakpoints: {
    620: {
      slidesPerView: 5
    },
    1120: {
      direction: 'vertical',
      autoHeight: true,
      slidesPerView: 'auto',
    },
  }
})
var accordionAllInstances = [] //all instances of classes


const accordion1 = new Accordion('.accordion-1', {
  speed: 500,
  spoilers: false
});
const accordion2 = new Accordion('.accordion-2', {
  speed: 500,
  spoilers: false
});
const accordion3 = new Accordion('.accordion-3', {
  speed: 500,
  spoilers: false
})

// animations 
const MENU_ITEMS = document.querySelectorAll('.nav__item ')
const MENU_ITEMS_REVERSED = [...MENU_ITEMS].reverse()

const TL = gsap.timeline()
TL.from('.about__grid', { duration: 2, opacity: 0, x: -100 })
  .from('.about__wrapper', { duration: 1, opacity: 0, y: -100 })
  .from(MENU_ITEMS_REVERSED, { duration: 1.5, x: -200, opacity: 0, stagger: 0.1 })

const LINKS = document.querySelectorAll('.href')
LINKS.forEach(element => {
  element.addEventListener("click", (e) => {
    e.preventDefault()
    const HREF = element.href
    TL.reverse()
    setTimeout(function () { window.location = HREF }, 4300);
  })
});