import { cursorController } from './scripts/cursorController'
import { preloaderController } from './scripts/preloaderController'
import Router from './scripts/router/Router'
import { addRoutes } from './scripts/router/addRoutes'
import { linksHandler } from './scripts/router/linksHandler'
const router = new Router('root')
addRoutes(router)
router.loadRoute()
linksHandler(router)
document.addEventListener('DOMContentLoaded', () => {
	preloaderController()
	cursorController()
})
