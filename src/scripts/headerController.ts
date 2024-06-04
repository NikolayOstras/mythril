const $body: HTMLBodyElement = document.querySelector('body')!
import gsap from 'gsap'
// Add the click event listener to the burger button
export const headerController = () => {
	const tl = gsap.timeline()

	// Animate the header logo
	tl.from('.logo', {
		y: '-100%',
		opacity: '0',
		duration: 1,
		ease: 'power2.out',
	}).from(
		'.nav__list li',
		{
			y: '100%',
			opacity: '0',

			duration: 0.6,
			ease: 'power2.out',
			stagger: 0.1,
		},
		'-=0.5'
	)
	// Grab the necessary DOM elements
	const $header: HTMLElement = document.querySelector('.header__container')!
	let $burger: HTMLButtonElement
	let $menu: HTMLDivElement
	if ($header) {
		$burger = $header.querySelector('.nav-mobile__button')!
		$menu = $header.querySelector('.mobile-nav-wrapper')!
	}

	if ($burger) {
		$burger.addEventListener('click', () => {
			// Toggle the active classes
			$header.classList.toggle('is-active')
			if ($menu) $menu.classList.toggle('is-active')
			$body.classList.toggle('inactive')
		})
	}
}
