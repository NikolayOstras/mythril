const $HEADER = document.querySelector('.header__container');
const $BURGER = $HEADER.querySelector('.nav-mobile__button');
const $MENU = $HEADER.querySelector('.nav-mobile__list');
const $BODY = document.querySelector('body');

$BURGER.onclick = () => {
	$HEADER.classList.toggle('is-active');
	$MENU.classList.toggle('is-active');
	$BODY.classList.toggle('inactive');
}