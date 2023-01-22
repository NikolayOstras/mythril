const $HEADER = document.querySelector('.header__container')
const $BURGER = $HEADER.querySelector('.nav-mobile__button')
const $MENU = $HEADER.querySelector('.nav-mobile__list')
const $BODY = document.querySelector('body')

console.log($HEADER.offsetHeight)

$BODY.style.paddingTop = `${$HEADER.offsetHeight}px`

$BURGER.onclick = () => {
	$HEADER.classList.toggle('is-active')
	$MENU.classList.toggle('is-active');
	$BODY.classList.toggle('inactive')
}