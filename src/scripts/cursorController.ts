export const cursorController = () => {
	const cursor = document.querySelector<HTMLElement>('.cursor')
	const cursorInner = document.querySelector<HTMLElement>('.cursor2')
	const links = document.querySelectorAll<HTMLAnchorElement>('a')

	if (cursor) {
		cursor.style.display = 'none'
	}

	if (cursorInner) {
		cursorInner.style.opacity = '0'
	}

	const canHover = window.matchMedia('(hover: hover)').matches

	if (canHover) {
		document.addEventListener('mousemove', (e: MouseEvent) => {
			if (cursor) {
				cursor.style.display = 'block'
			}
			if (cursorInner) {
				cursorInner.style.opacity = '1'
				cursorInner.style.left = `${e.clientX}px`
				cursorInner.style.top = `${e.clientY}px`
			}
			if (cursor) {
				cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
			}
		})

		document.addEventListener('mousedown', () => {
			if (cursor) {
				cursor.classList.add('click')
			}
			if (cursorInner) {
				cursorInner.classList.add('cursorinnerhover')
			}
		})

		document.addEventListener('mouseup', () => {
			if (cursor) {
				cursor.classList.remove('click')
			}
			if (cursorInner) {
				cursorInner.classList.remove('cursorinnerhover')
			}
		})

		links.forEach(link => {
			link.addEventListener('mouseover', () => {
				if (cursor) {
					cursor.classList.add('hover')
				}
			})
			link.addEventListener('mouseleave', () => {
				if (cursor) {
					cursor.classList.remove('hover')
				}
			})
		})
	}
}
