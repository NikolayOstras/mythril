import gsap from 'gsap'
import { headerController } from '../../headerController'
export const nftPageController = () => {
	headerController()
	// Получаем все элементы .item
	const items = document.querySelectorAll('.item')

	// Создаем timeline
	const timeline = gsap.timeline()

	// Добавляем анимацию для каждого элемента .item
	items.forEach(item => {
		// Генерируем случайный сдвиг по x и y
		const randomX = Math.random() * 50 - 25
		const randomY = Math.random() * 50 - 25

		// Добавляем анимацию в timeline
		timeline.fromTo(
			item,
			{
				duration: 0.8,
				x: randomX,
				y: randomY,
				opacity: 0,
				ease: 'bounce',
			},
			{
				x: 0,
				y: 0,
				opacity: 1,
			}
		)
	})
}
