import Accordion from '../../../vendor/components/accordion/accordion'
import { headerController } from '../../headerController'

export const aboutPageController = () => {
	headerController()
	const accordion1Element = document.querySelector('.accordion-1')
	const accordion2Element = document.querySelector('.accordion-2')
	const accordion3Element = document.querySelector('.accordion-3')

	const accordion1 = accordion1Element
		? new Accordion('.accordion-1', { speed: 500, spoilers: false })
		: null
	const accordion2 = accordion2Element
		? new Accordion('.accordion-2', { speed: 500, spoilers: false })
		: null
	const accordion3 = accordion3Element
		? new Accordion('.accordion-3', { speed: 500, spoilers: false })
		: null

	return () => {
		// Assuming Accordion has a destroy method to clean up
		accordion1?.destroy()
		accordion2?.destroy()
		accordion3?.destroy()
	}
}
