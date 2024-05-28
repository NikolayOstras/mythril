const slideSelector = '.services-slider__wrapper'

export const servicesPageController = () => {
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
}
