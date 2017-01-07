var autoprefixer    = require('autoprefixer');
var browserSync     = require('browser-sync').create();
var reload          = browserSync.reload;
var mqpacker        = require('css-mqpacker');
var cssnano         = require('cssnano');
var del             = require('del');
var cache           = require('gulp-cache');
var concat          = require('gulp-concat');
var gulp            = require('gulp');
var imagemin        = require('gulp-imagemin');
var jshint          = require('gulp-jshint');
var postcss         = require('gulp-postcss');
var shell           = require('gulp-shell');
var size            = require('gulp-size');
var sourcemaps      = require('gulp-sourcemaps');
var uglify          = require('gulp-uglify');
var uncss           = require('gulp-uncss');
var util            = require('gulp-util');
var watch           = require('gulp-watch');
var calc            = require('postcss-calc');
var color           = require('postcss-color-function');
var media           = require('postcss-custom-media');
var properties      = require('postcss-custom-properties');
var comments        = require('postcss-discard-comments');
var atImport        = require('postcss-import');
var nested          = require('postcss-nested');
var pump            = require('pump');

var input			= {
	'css': './css/jekyons.css'
}

var output			= {
	'css': './_site/css'
}

gulp.task('css', function(){

	var processors 	= [
		atImport,
		media,
		nested,
		properties,
		calc,
		color,
		comments,
		autoprefixer,
		cssnano,
		mqpacker
	];

	return gulp.src(input.css)
		.pipe(postcss(processors))

		.pipe(size({
			gzip: true,
			showFiles: true,
			title: 'Size all gZippered up ->'
		}))

		.pipe(gulp.dest(output.css))

		.pipe(browserSync.stream())
});


// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll build --watch']));
// Or if you don't use bundle:
// gulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', reload);
});

gulp.task('default', ['css', 'build', 'serve']);
