import MicroModal from 'micromodal'
import Swiper, { Autoplay } from 'swiper'
import { headerController } from '../../headerController'
Swiper.use([Autoplay])

export const jobsPageController = () => {
	headerController()
	MicroModal.init()

	const jobsSlider = new Swiper('.jobs-slider', {
		speed: 5000,
		loop: true,
		slidesPerView: 1,
		spaceBetween: 30,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
		},
	})

	const popupSlider = new Swiper('.popup__slider', {
		speed: 30000,
		loop: true,
		autoHeight: true,
		slidesPerView: 1.2,
		autoplay: {
			delay: 1000,
			disableOnInteraction: false,
		},
		breakpoints: {
			768: {
				direction: 'vertical',
				slidesPerView: 'auto',
			},
		},
	})

	// Cleanup function
	return () => {
		// Assuming Swiper instances have a destroy method to clean up
		jobsSlider.destroy(true, true)
		popupSlider.destroy(true, true)

		// There's no direct way to destroy MicroModal instances, but we can reset its state
		// Assuming MicroModal has a reset or destroy method (if not, this line can be omitted)
		// MicroModal.reset(); // Uncomment if MicroModal provides a reset method
	}
}
