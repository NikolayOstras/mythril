export const preloaderController = () => {
	const PRELOADER = document.querySelector<HTMLDivElement>('.preloader')
	const BODY = document.querySelector<HTMLBodyElement>('body')
	const HEADER = document.querySelector<HTMLDivElement>('.header__container')
	if (PRELOADER) PRELOADER.style.display = 'none'
	if (BODY) BODY.classList.remove('inactive')
	if (HEADER) HEADER.classList.remove('visually-hidden')
}
