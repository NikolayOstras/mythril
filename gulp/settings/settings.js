// path
export const path = {
	build: {
		html: './build/',
		css: './build/css/',
		img: './build/img/',
		js: './build/js/',
	},
	src: {
		pug: './src/pug/pages/*.pug',
		img: './src/assets/img/**/*.{jpg,jpeg,png,gif}',
		scss: './src/scss/main.scss',
		js: './src/app.ts',
	},
	clean: './build',
}

// plugins

import notify from 'gulp-notify'
import plumber from 'gulp-plumber'

export const plugins = {
	notify,
	plumber,
}
