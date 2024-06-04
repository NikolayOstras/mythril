import gsap from 'gsap'

export const animateNetworkItems = () => {
	// Анимация появления элементов сети
	gsap.from('.network__item', {
		duration: 1,
		opacity: 0,
		y: 50,
		ease: 'power2.out',
		stagger: 0.2, // Задержка между анимацией каждого элемента
	})

	// Анимация при наведении на элементы сети
	document.querySelectorAll<HTMLElement>('.network__link').forEach(item => {
		item.addEventListener('mouseenter', () => {
			gsap.to(item, {
				duration: 0.3,
				scale: 1.1,
				ease: 'power1.out',
			})
		})

		item.addEventListener('mouseleave', () => {
			gsap.to(item, {
				duration: 0.3,
				scale: 1,
				ease: 'power1.out',
			})
		})
	})
}
