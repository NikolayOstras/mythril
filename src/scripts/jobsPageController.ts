import MicroModal from 'micromodal'
import Swiper, { Autoplay } from 'swiper'
Swiper.use([Autoplay])

export const jobsPageController = () => {
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
}
