import '../common/header'
import { gsap } from "gsap";
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
// animation
const MENU_ITEMS = document.querySelectorAll('.nav__item ')
const MENU_ITEMS_REVERSED = [...MENU_ITEMS].reverse()
const SOCIALS_ITEMS = document.querySelectorAll('.network__item')
const SOCIALS_ITEMS_REVERSED = [...SOCIALS_ITEMS].reverse()
const TL = gsap.timeline()
TL.from(MENU_ITEMS_REVERSED, { duration: 1.5, x: -200, opacity: 0, stagger: 0.1 })
  .from(SOCIALS_ITEMS_REVERSED, { duration: 1, y: -200, opacity: 0, stagger: 0.1 }, '-=1.3')
  .from('.hero__title-slider', { duration: 0.1, opacity: 0 })
  .from('.hero-gallery', { duration: 1, y: -200, scale: 1.1, opacity: 0 })
  .from('.hero__next', { duration: 1, y: -200, opacity: 0 });