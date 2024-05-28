import Accordion from '../vendor/components/accordion/accordion'

export const aboutPageController = () => {
	const accordion1Element = document.querySelector('.accordion-1')
	if (accordion1Element) {
		const accordion1 = new Accordion('.accordion-1', {
			speed: 500,
			spoilers: false,
		})
	}

	const accordion2Element = document.querySelector('.accordion-2')
	if (accordion2Element) {
		const accordion2 = new Accordion('.accordion-2', {
			speed: 500,
			spoilers: false,
		})
	}

	const accordion3Element = document.querySelector('.accordion-3')
	if (accordion3Element) {
		const accordion3 = new Accordion('.accordion-3', {
			speed: 500,
			spoilers: false,
		})
	}
}
