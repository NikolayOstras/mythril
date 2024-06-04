type Route = {
	path: string
	templateId: string
	controller?: () => () => void
}

class Router {
	routes: Route[] = []
	rootElement: HTMLElement
	currentControllerCleanup: () => void = () => {}

	constructor(rootElementId: string) {
		this.rootElement = document.getElementById(rootElementId) as HTMLElement
		this.loadRoute()
		window.addEventListener('popstate', () => this.loadRoute())
	}

	addRoute(
		path: string,
		templateId: string,
		controller?: () => () => void
	): void {
		this.routes.push({ path, templateId, controller })
	}

	loadRoute(): void {
		// Call the cleanup function if it exists
		if (typeof this.currentControllerCleanup === 'function') {
			this.currentControllerCleanup()
		}

		const currentPath = window.location.pathname
		const route = this.routes.find(r => r.path === currentPath)

		if (route) {
			const template = document.getElementById(
				route.templateId
			) as HTMLTemplateElement
			if (template) {
				this.rootElement.innerHTML = ''
				this.rootElement.appendChild(template.content.cloneNode(true))

				// Call the controller if it exists and set the cleanup function
				this.currentControllerCleanup = route.controller
					? route.controller()
					: () => {}
			}
		} else {
			this.rootElement.innerHTML =
				'<h1>404 - Page Not Found</h1> <a href="/" data-link>Home page</a>'
			this.currentControllerCleanup = () => {} // Ensure it's a function
		}
	}

	navigate(path: string): void {
		history.pushState({}, '', path)
		this.loadRoute()
	}
}

export default Router
