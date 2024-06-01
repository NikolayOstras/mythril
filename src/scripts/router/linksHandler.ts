export const linksHandler = router => {
	document.addEventListener('click', (event: Event) => {
		const target = event.target as HTMLElement
		if (target.tagName === 'A' && target.hasAttribute('data-link')) {
			event.preventDefault()
			const path = target.getAttribute('href')
			if (path) {
				router.navigate(path)
			}
		}
	})
}
