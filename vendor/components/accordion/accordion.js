export var accordionAllInstances = [] //all instances of classes
export default class Accordion {
   constructor(selector, options) {
      let defaultOptions = {
         isOpen: () => { },
         isClose: () => { },
         speed: 300,
         spoilers: false, //if dont need close all accordions when one open , change on true
         //classes: {},
      }
      this.all = []
      this.options = Object.assign(defaultOptions, options)
      this.accordion = document.querySelector(selector)
      this.accordion.setAttribute('accord-init', true)
      this.control = this.accordion.querySelector('.accordion__control')
      this.content = this.accordion.querySelector('.accordion__content')
      this.event();
      accordionAllInstances.push(this)

   }
   event() {
      if (this.accordion) {
         this.accordion.addEventListener('click', (e) => {

            this.accordion.classList.toggle('open')
            if (this.accordion.classList.contains('open')) {
               this.open()
            } else {
               this.close(this)
            }
         })
      }
   }
   open() {
      if (this.options.spoilers === false) {
         this.closeAll()
      }
      this.accordion.style.setProperty('--accordion-time', `${this.options.speed / 1000}s`)
      this.accordion.classList.add('is-open')
      this.control.setAttribute('aria-expanded', true)
      this.control.setAttribute('aria-hidden', false)
      this.content.style.maxHeight = this.content.scrollHeight + 'px'
      this.options.isOpen(this)
   }
   close(el) {
      el.accordion.classList.remove('open')
      el.accordion.classList.remove('is-open')
      el.control.setAttribute('aria-expanded', false)
      el.control.setAttribute('aria-hidden', true)
      el.content.style.maxHeight = null
      el.options.isClose(this)
   }
   // close all accordions
   closeAll() {
      accordionAllInstances.forEach((el) => {
         if (el.accordion.classList.contains('is-open')) {
            this.close(el)
         }
      })
   }

}
