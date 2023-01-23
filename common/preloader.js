addEventListener('DOMContentLoaded', (event) => {
  const PRELOADER = document.querySelector('.preloader')
  const BODY = document.querySelector('body')
  const HEADER = document.querySelector('.header__container')
  PRELOADER.style.display = 'none'
  BODY.classList.remove('inactive')
  HEADER.classList.remove('visually-hidden')

})