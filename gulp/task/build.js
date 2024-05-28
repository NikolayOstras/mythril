import gulpEsbuild from 'gulp-esbuild'

export const build = () => {
	return app.gulp
		.src(app.path.src.js)
		.pipe(
			gulpEsbuild({
				outfile: 'app.js',
				bundle: true,
				// minify: true,
				loader: {
					'.ts': 'ts',
				},
			})
		)
		.pipe(app.gulp.dest(app.path.build.js))
}
