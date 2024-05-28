import { aboutPageController } from './scripts/aboutPageController'
import { contactsPageController } from './scripts/contactsPageController'
import { cursorController } from './scripts/cursorController'
import { headerController } from './scripts/headerController'
import { homePageController } from './scripts/homePageController'
import { jobsPageController } from './scripts/jobsPageController'
import { preloaderController } from './scripts/preloaderController'
import { servicesPageController } from './scripts/servicesPageController'

document.addEventListener('DOMContentLoaded', () => {
	preloaderController()
	cursorController()
	headerController()
	homePageController()
	servicesPageController()
	jobsPageController()
	aboutPageController()
	contactsPageController()
})
