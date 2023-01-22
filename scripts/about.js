import '../common/header'
import Accordion from '../vendor/components/accordion/accordion'
import '../vendor/components/accordion/accordion.css'

import Swiper from 'swiper';
import { Autoplay } from 'swiper';
Swiper.use([Autoplay]);
import 'swiper/css';

const SLIDER = new Swiper('.about__swiper', {
  loop: true,
  // autoHeight: true,
  spaceBetween: 0,
  direction: 'horizontal',
  slidesPerView: 10,

  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  speed: 20000,

  // breakpoints: {
  //   1120: {
  //     direction: 'vertical',

  //     slidesPerView: 'auto',
  //   },
  // }
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