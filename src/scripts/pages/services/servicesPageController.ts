import gsap from 'gsap'
import { headerController } from '../../headerController'
const slideSelector = '.services-slider__wrapper'

export const servicesPageController = () => {
	headerController()
	const root1 = document.querySelector<HTMLDivElement>('.ss-1')
	const root2 = document.querySelector<HTMLDivElement>('.ss-2')

	if (root1) {
		const slide1 = root1.querySelector<HTMLDivElement>(slideSelector)
		if (slide1) {
			root1.appendChild(slide1.cloneNode(true))
		}
	}

	if (root2) {
		const slide2 = root2.querySelector<HTMLDivElement>(slideSelector)
		if (slide2) {
			root2.appendChild(slide2.cloneNode(true))
		}
	}
	// Initialize the GSAP timeline
	const tl = gsap.timeline()

	// Animate the side navigation
	tl.from('.side-nav__item', {
		y: '100%',
		opacity: 0,
		duration: 0.8,
		ease: 'power2.out',
		stagger: 0.1,
	})
		.from('.ss-1', {
			x: '-100',
			opacity: 0,
			duration: 0.3,
		})
		.from('.ss-2', {
			x: '100',
			opacity: 0,
			duration: 0.3,
		})
		.from('.services-slider__img', {
			scale: 0,
			opacity: 0,
			duration: 0.5,
		})
		.from('.services-slider__wrapper img', {
			scale: 0,
			opacity: 0,
			duration: 1.5,
		})
}
