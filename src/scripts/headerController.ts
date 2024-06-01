const $body: HTMLBodyElement = document.querySelector('body')!

// Add the click event listener to the burger button
export const headerController = () => {
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
