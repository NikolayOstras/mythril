import '../common/header'
import JustValidate from 'just-validate';
import { gsap } from "gsap";

const $FORM = document.querySelector('.form');
if ($FORM) {
  const VALIDATE = new JustValidate('.form', {
    errorFieldCssClass: 'is-invalid',
    focusInvalidField: false,
    lockForm: true,
    validateBeforeSubmitting: true,
  },);

  VALIDATE
    .addField('#text', [{
      rule: 'minLength',
      value: 10,
    },
    {
      rule: 'required',
      errorMessage: '',
    },
    {
      rule: 'maxLength',
      value: 300,
    },
    ])
    .addField('#email', [{
      rule: 'required',
      errorMessage: '',
    },
    {
      rule: 'email',
      errorMessage: '',
    },

    ])
    .addField('#checkbox', [{
      rule: 'required',
      errorMessage: '',
    },]);

}

// animations 
const TL = gsap.timeline()
const MENU_ITEMS = document.querySelectorAll('.nav__item ')
const MENU_ITEMS_REVERSED = [...MENU_ITEMS].reverse()
TL.from('.contacts__content', { duration: 2, opacity: 0, x: -100 })
  .from(MENU_ITEMS_REVERSED, { duration: 1.5, x: -200, opacity: 0, stagger: 0.1 })