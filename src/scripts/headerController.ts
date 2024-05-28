// Grab the necessary DOM elements
const $header: HTMLElement = document.querySelector('.header__container')!
const $burger: HTMLButtonElement = $header.querySelector('.nav-mobile__button')!
const $menu: HTMLElement = $header.querySelector('.mobile-nav-wrapper')!
const $body: HTMLBodyElement = document.querySelector('body')!

// Add the click event listener to the burger button
export const headerController = () => {
	$burger.addEventListener('click', () => {
		// Toggle the active classes
		$header.classList.toggle('is-active')
		$menu.classList.toggle('is-active')
		$body.classList.toggle('inactive')
	})
}
