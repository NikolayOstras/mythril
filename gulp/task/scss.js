import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
const sass = gulpSass(dartSass)

export const scss = () => {
	return app.gulp
		.src(app.path.src.scss)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'SCSS',
					message: 'Error <%= error.message %>',
				})
			)
		)
		.pipe(sass({}))
		.pipe(app.gulp.dest(app.path.build.css))
}
