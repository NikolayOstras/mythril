const $HEADER = document.querySelector('.header__container');
const $MOBILE_NAV = $HEADER.querySelectorAll('.nav-mobile__item');
const $BURGER = $HEADER.querySelector('.nav-mobile__button');
const $MENU = $HEADER.querySelector('.nav-mobile__list');

$BURGER.onclick = () => {
	$HEADER.classList.toggle('is-active');
	$MENU.classList.toggle('is-active');
}