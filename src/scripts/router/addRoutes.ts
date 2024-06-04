import { aboutPageController } from '../pages/about/aboutPageController'
import { contactsPageController } from '../pages/contacts/contactsPageController'
import { homePageController } from '../pages/home/homePageController'
import { jobsPageController } from '../pages/jobs/jobsPageController'
import { nftPageController } from '../pages/nft/nftPageController'
import { servicesPageController } from '../pages/services/servicesPageController'

export const addRoutes = router => {
	router.addRoute('/', 'home-page', homePageController)
	router.addRoute('/about', 'about-page', aboutPageController)
	router.addRoute('/services', 'services-page', servicesPageController)
	router.addRoute('/nft', 'nft-page', nftPageController)
	router.addRoute('/jobs', 'jobs-page', jobsPageController)
	router.addRoute('/contacts', 'contacts-page', contactsPageController)
}
