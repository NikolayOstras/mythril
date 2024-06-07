import gsap from 'gsap'
import Swiper, { Autoplay } from 'swiper'
import { headerController } from '../../headerController'
import { animateNetworkItems } from './animateNetworkItems'

Swiper.use([Autoplay])

export const homePageController = () => {
	headerController()

	const heroGallerySlider = new Swiper('.hero-gallery', {
		speed: 2500,
		loop: true,
		centeredSlides: true,
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

	heroGallerySlider.on('slideChange', () => {
		console.log('Slide changed')

		// Получаем активный индекс и текущий слайд
		const activeIndex = heroGallerySlider.activeIndex
		const currentSlide = heroGallerySlider.slides[activeIndex]
		console.log(`Active Index: ${activeIndex}`)
		console.log(`Current Slide:`, currentSlide)

		// Проверяем, нашли ли мы текущий слайд
		if (!currentSlide) {
			console.error('Current slide not found')
			return
		}

		// Ищем элементы для анимации
		const titleItem = currentSlide.querySelector('.hero-title__item')
		const imageItem = currentSlide.querySelector('img')

		console.log('Title Item:', titleItem)
		console.log('Image Item:', imageItem)

		// Анимация для заголовка
		if (titleItem) {
			gsap.fromTo(
				titleItem,
				{ x: 0 },
				{ x: -20, duration: 1, ease: 'power2.out' }
			)
		} else {
			console.error('.hero-title__item not found')
		}

		// Анимация для изображения
		if (imageItem) {
			gsap.fromTo(
				imageItem,
				{ x: 0 },
				{ x: 20, duration: 3, ease: 'power2.out' }
			)
		} else {
			console.error('Image not found')
		}
	})

	// Вызов функции анимации элементов сети
	animateNetworkItems()

	return () => {
		if (heroGallerySlider) {
			heroGallerySlider.destroy(true, true)
		}
	}
}
