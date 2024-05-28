import gulpPug from 'gulp-pug'

export const pug = () => {
	return app.gulp
		.src(app.path.src.pug)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'HTML',
					message: 'Error <%= error.message %>',
				})
			)
		)
		.pipe(gulpPug({}))
		.pipe(app.gulp.dest(app.path.build.html))
}
