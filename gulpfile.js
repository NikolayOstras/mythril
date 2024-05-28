import gulp from 'gulp'
import { path, plugins } from './gulp/settings/settings.js'

import { build } from './gulp/task/build.js'
import { css } from './gulp/task/css.js'
import { pug } from './gulp/task/pug.js'
import { scss } from './gulp/task/scss.js'

global.app = {
	gulp: gulp,
	path: path,
	plugins: plugins,
}

const watcher = () => {
	gulp.watch('./src/**/**/*.pug', pug)
	gulp.watch('./src/**/**/*.scss', scss)
	gulp.watch('./src/**/**/*.ts', build)
}
const buildApp = gulp.series(pug, scss, build, css)
const dev = gulp.series(pug, scss, build, watcher)

gulp.task('build', buildApp)
gulp.task('dev', dev)
