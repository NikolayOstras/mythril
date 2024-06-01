import Swiper, { Autoplay } from 'swiper'
import { headerController } from '../../headerController'

Swiper.use([Autoplay])

const commonSliderSettings = {
	speed: 50100,
}

export const homePageController = () => {
	headerController()

	const heroGallerySlider = new Swiper('.hero-gallery', {
		speed: 2500,
		loop: true,
		slidesPerView: 1,
		spaceBetween: 30,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		breakpoints: {
			768: {
				slidesPerView: 2.5,
				spaceBetween: 60,
			},
		},
	})
	return () => {
		if (heroGallerySlider) {
			heroGallerySlider.destroy(true, true)
		}
	}
}
