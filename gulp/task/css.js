import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'

export const css = () => {
	return app.gulp
		.src(`${app.path.build.css}style.css`, {})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'CSS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ['last 3 version'],
				cascade: true,
			})
		)
		.pipe(cleanCss())
		.pipe(app.gulp.dest(app.path.build.css))
}
